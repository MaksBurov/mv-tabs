export default class Tablist extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute("role", "tablist");

    const orientation = this.getAttribute("orientation") || "horizontal";
    this.setAttribute("aria-orientation", orientation);
  }
}
customElements.define("mv-tablist", Tablist);
