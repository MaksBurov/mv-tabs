export default class Tablist extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.setAttribute("role", "tablist");
  }
}
customElements.define("mv-tablist", Tablist);
