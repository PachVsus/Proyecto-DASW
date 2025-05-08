class AppElement extends HTMLElement {
    constructor() {
        super();
        this.textContent = '¡Hola mundo!';
    }
}

customElements.define('app-element', AppElement);