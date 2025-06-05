export default class tool {
    constructor() {
        this.element = null
    }

    createElement(name_element) {
        this.element = document.createElement(name_element)
        return this
    }

    textContent(text) {
        if (this.element)
            this.element.textContent = text
        return this
    }

    class(...classes) {
        if (this.element)
            this.element.classList.add(...classes)
        return this
    }

    src(src) {
        if (this.element)
            this.element.src = src
        return this
    }

    alt(alt) {
        if (this.element)
            this.element.alt = alt
        return this
    }

    appendTo(parent) {
        if (this.element && parent instanceof HTMLElement) 
            parent.appendChild(this.element)
        return this
    }

    placeholder(text) {
        if(this.element)
            this.element.placeholder = text
        return this
    }

    type(type) {
        if(this.element)
            this.element.type = type
        return this
    }

    async getPokemon() {
    const res = await fetch("https://pokebuildapi.fr/api/v1/pokemon")
    return await res.json()
  }
}