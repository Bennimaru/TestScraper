function newElement(type, attributes = {}) {
    const element = document.createElement(type);
    for (let attribute in attributes) {
        const value = attributes[attribute];
        if (attribute == "innerText") {
            element.innerText = value;
        }
        else {
            element.setAttribute(attribute, value);
        }
    }
    return element;
}

function submitURL() {
    const input = document.querySelector('.url-input').value

    fetch('http://localhost:3000/creators', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({ input })
    })

}

async function loadCreators() {
    const res = await fetch('http://localhost:3000/creators')
    const creators = await res.json()

    const ctr = document.querySelector('.container')

    creators.forEach(creator => {
        const card = newElement('div', { class: 'card' })
        const title = newElement('h4', { innerText: creator.name })
        const img = newElement('img', { src: creator.img })


        ctr.appendChild(title)
        ctr.appendChild(img)
        ctr.appendChild(card)
    })
}

loadCreators()