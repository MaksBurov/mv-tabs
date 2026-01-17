let tabpanelCounter = 0;

export default class Tabpanel extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.id) this.id = `tabpanel-${tabpanelCounter++}`;
    this.setAttribute("role", "tabpanel");

    // Если нужно сделать панель фокусируемой
    if (this.hasAttribute("focusable")) {
      this.setAttribute("tabindex", "0");
    }
  }
}
customElements.define("mv-tabpanel", Tabpanel);
