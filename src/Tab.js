let tabCounter = 0;

export default class Tab extends HTMLElement {
  static get observedAttributes() {
    return ["selected"];
  }

  constructor() {
    super();
  }
  connectedCallback() {
    if (!this.id) this.id = `tab-${tabCounter++}`;
    this.setAttribute("role", "tab");
    this.setAttribute("tabindex", "-1");
    this.setAttribute("aria-selected", "false");
  }
  attributeChangedCallback() {
    const value = this.hasAttribute("selected");
    this.setAttribute("aria-selected", value);
    this.setAttribute("tabindex", value ? 0 : -1);
  }

  set selected(value) {
    value = Boolean(value);
    if (value) this.setAttribute("selected", "");
    else this.removeAttribute("selected");
  }

  get selected() {
    return this.hasAttribute("selected");
  }
}

customElements.define("mv-tab", Tab);
