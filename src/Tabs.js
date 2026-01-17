export default class Tabs extends HTMLElement {
  constructor() {
    super();
    this._tabs = [];
    this._panels = [];
  }

  connectedCallback() {
    this.addEventListener("keydown", this._onKeyDown);
    this.addEventListener("click", this._onClick);

    Promise.all([
      customElements.whenDefined("mv-tablist"),
      customElements.whenDefined("mv-tab"),
      customElements.whenDefined("mv-tabpanel"),
    ]).then(() => this.init());
  }

  disconnectedCallback() {
    this.removeEventListener("keydown", this._onKeyDown);
    this.removeEventListener("click", this._onClick);
  }

  get selectedIndex() {
    return this._tabs.findIndex(t => t.selected);
  }

  selectTabByIndex(index, focus = false) {
    const tab = this._tabs[index];
    if (tab) this._selectTab(tab, focus);
  }

  selectTabById(id, focus = false) {
    const tab = this._tabs.find(t => t.id === id);
    if (tab) this._selectTab(tab, focus);
  }

  _cacheElements() {
    this._tabs = [...this.querySelectorAll("mv-tab")];
    this._panels = [...this.querySelectorAll("mv-tabpanel")];
  }

  init() {
    this._cacheElements();

    if (!this._tabs.length) {
      console.warn("mv-tabs: tabs not found.");
      return;
    }

    this._tabs.forEach((tab, i) => {
      const panel = this._panels[i];
      if (!panel) return;

      tab.setAttribute("aria-controls", panel.id);
      panel.setAttribute("aria-labelledby", tab.id);
    });

    const initial = this._tabs.find(t => t.selected) || this._tabs[0];
    this._selectTab(initial);
  }

  _reset() {
    this._tabs.forEach(t => t.selected = false);
    this._panels.forEach(p => p.hidden = true);
  }

  _selectTab(newTab, focused = false) {
    const panelId = newTab.getAttribute("aria-controls");
    const newPanel = this.querySelector(`#${panelId}`);
    if (!newPanel) throw new Error(`mv-tabs: panel for ${newTab.id} not found`);

    this._reset();
    newTab.selected = true;
    newPanel.hidden = false;

    this.dispatchEvent(new CustomEvent("mv-tab-change", {
      bubbles: true,
      composed: true,
      detail: {
        tab: newTab,
        index: this._tabs.indexOf(newTab),
        tabpanel: newPanel
      }
    }));

    if (focused) newTab.focus();
  }

  _prevTab() {
    const i = this.selectedIndex;
    return this._tabs[(i - 1 + this._tabs.length) % this._tabs.length];
  }

  _nextTab() {
    const i = this.selectedIndex;
    return this._tabs[(i + 1) % this._tabs.length];
  }

  _onKeyDown = (event) => {
    if (event.altKey) return;
    const target = event.target;
    if (!(target instanceof HTMLElement) || target.tagName !== "MV-TAB") return;

    const orientation = this.querySelector("mv-tablist")?.getAttribute("orientation") || "horizontal";
    let next = null;

    switch (event.key) {
      case "ArrowLeft":
        if (orientation === "horizontal") next = this._prevTab();
        break;
      case "ArrowRight":
        if (orientation === "horizontal") next = this._nextTab();
        break;
      case "ArrowUp":
        if (orientation === "vertical") next = this._prevTab();
        break;
      case "ArrowDown":
        if (orientation === "vertical") next = this._nextTab();
        break;
      case "Home":
        next = this._tabs[0];
        break;
      case "End":
        next = this._tabs[this._tabs.length - 1];
        break;
      default:
        return;
    }

    if (next) {
      event.preventDefault();
      this._selectTab(next, true);
    }
  }

  _onClick = (event) => {
    if (event.target.tagName === "MV-TAB") {
      this._selectTab(event.target, true);
    }
  }
}

customElements.define("mv-tabs", Tabs);
