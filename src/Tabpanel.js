let tabpanelCounter = 0;

export default class Tabpanel extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    if (!this.id) this.id = `tabpanel-${tabpanelCounter++}`;
    this.setAttribute("role", "tabpanel");
    this.setAttribute("tabindex", "0");
  }
}

customElements.define("mv-tabpanel", Tabpanel);
