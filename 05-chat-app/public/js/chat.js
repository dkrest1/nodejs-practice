const socket = io()

// creating form elements 
const $messageForm = document.querySelector("#message-form")
const $messageFormInput = $messageForm.querySelector("input")
const $messageFormButton = $messageForm.querySelector("button")
const $locationButton = document.querySelector("#send-location")
const $messages = document.querySelector("#messages")

// Template
const messageTemplate = document.querySelector("#message-template").innerHTML
const locationTemplate = document.querySelector("#location-template").innerHTML

// options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.on("message", (message) => {
    console.log(message.text)

    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format("h:mm a")
    })
    $messages.insertAdjacentHTML("beforeend", html)
})

socket.on("locationMessage", (url) => {
    console.log(url.location)

    const html = Mustache.render(locationTemplate, {
        location: url.location,
        createdAt: moment(url.createdAt).format("h:mm a")
    })
    $messages.insertAdjacentHTML("beforeend", html)
})



$messageForm.addEventListener('submit', (event) => {
    event.preventDefault()

    // disable
    $messageFormButton.setAttribute("disabled", "disabled")

    const message = event.target.elements.message.value

    socket.emit("sendMessage", message, (error) => {
        // enable
        $messageFormButton.removeAttribute("disabled")
        // clear button input
        $messageFormInput.value = ""
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }

        console.log("message delivered!")
    })
})

$locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert("sorry, your browser does not support geolocation")
    }

    // disable send location button
    $locationButton.setAttribute("disabled", "disabled")

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("sendLocation", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $locationButton.removeAttribute("disabled")
            console.log("Location shared!")

        })
    })
})

socket.emit("join", { username, room })
