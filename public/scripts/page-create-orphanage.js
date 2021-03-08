const map = L.map("mapid").setView([-27.222633, -49.6455874], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", ).addTo(map);

const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
})

let marker;

// create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // remove icon 

    marker && map.removeLayer(marker)

    // add icon layer

    marker = L.marker([lat, lng], { icon })
    .addTo(map)


})

// add photo layer
function addPhotoField() {
    // grab photo container #images
    const container = document.querySelector('#images')
    // grab duplicate container .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload')
    // clone last added image
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
    //verify if layer is empty, if yes, do not append
    const input = newFieldContainer.children[0]
    if(input.value == '') {
        return
    }
    // clear layer before adding a new one
    input.value = ''
    // add cloned image to image container
    container.appendChild(newFieldContainer)
}

function deleteField(event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length <= 1) {
        // clear field value
        span.parentNode.children[0].value = ""
        return
    }

    // delete field
    span.parentNode.remove();
}

// switch yes/no button

function toggleSelect(event) {
    // remove active class from buttons
    document.querySelectorAll('.button-select button')
    .forEach(button => button.classList.remove('active'))
    // get active button
    const button = event.currentTarget
    button.classList.add('active')
    // update hidden input with selected value
    const input = document.querySelector('[name = "open_on_weekends"]')

    input.value = button.dataset.value
}

// function validate(event) {


//     event.preventDefault()
//     alert('Selecione um ponto no mapa!')
// }