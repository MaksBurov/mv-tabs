export default class Tabs extends HTMLElement {
  constructor() {
    super();
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

  _tabList() {
    return this.querySelector("mv-tablist");
  }
  _tabAll() {
    return this.querySelectorAll("mv-tab");
  }
  _tabPanelsList() {
    return this.querySelectorAll("mv-tabpanel");
  }
  prevTab() {
    const tabs = Array.from(this._tabAll());
    const newIdx = tabs.findIndex((tab) => tab.hasAttribute("selected")) - 1;
    return tabs[(newIdx + tabs.length) % tabs.length];
  }
  nextTab() {
    const tabs = Array.from(this._tabAll());
    const newIdx = tabs.findIndex((tab) => tab.hasAttribute("selected")) + 1;
    return tabs[newIdx % tabs.length];
  }
  _reset() {
    const tabs = this._tabAll();
    const panels = this._tabPanelsList();

    for (const tab of tabs) {
      tab.selected = false;
    }
    for (const panel of panels) {
      panel.hidden = true;
    }
  }
  _selectTab(newTab, focused = false) {
    this._reset();

    const newPanel = this._panelForSelectedTab(newTab);
    if (!newPanel) throw new Error(`No panel with id ${newPanelId}`);

    newTab.selected = true;
    newPanel.hidden = false;
    if (focused) newTab.focus();
  }
  init() {
    const tabs = this._tabAll(),
      tabpanels = this._tabPanelsList();
    let selectedTab = null;

    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-controls", tabpanels[i].id);
      tabpanels[i].setAttribute("aria-labelledby", tab.id);

      if (tab.selected) selectedTab = tab;
    });

    this._selectTab(selectedTab || tabs[0]);
  }
  _panelForSelectedTab(tab) {
    const panelId = tab.getAttribute("aria-controls");
    return this.querySelector(`#${panelId}`);
  }

  _onKeyDown(event) {
    if (event.target.getAttribute("role") !== "tab") return;
    if (event.altKey) return;
    let newTab;

    switch (event.keyCode) {
      case 37:
        newTab = this.prevTab();
        break;

      case 39:
        newTab = this.nextTab();
        break;
      default:
        return;
    }
    event.preventDefault();
    this._selectTab(newTab, true);
  }
  _onClick(event) {
    if (event.target.getAttribute("role") !== "tab") return;
    this._selectTab(event.target, true);
  }
}
customElements.define("mv-tabs", Tabs);
