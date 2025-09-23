export class Item {
    // DOM elements
    DOM = {
        // main element
        el: null,
        // Other Elements
        price: null,
    }

    /**
     * Constructor
     * @param {Element} DOM_el - The main element
     */
    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        this.DOM.price = this.DOM.el.querySelector('.price');
    }
}
