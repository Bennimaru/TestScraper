function newElement(type, attributes = {}) {
    const element = document.createElement(type);
    for (let attribute in attributes) {
        const value = attributes[attribute];
        if (attribute == "innerText") {
            element.innerText = value;
        } else {
            element.setAttribute(attribute.value);
        }
    }
    return element;
}

const container = document.querySelector(.container)
const card = newElement('div', { class: 'card' })

container.appendChild(card)