console.log("client side javascript is loading")




const weatherForm = document.querySelector('form')
const formInput = document.querySelector("input")
const errorMessage = document.querySelector("#errorMessage")
const weatherMessage = document.querySelector("#weatherMessage")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    errorMessage.textContent = "loading weather Result..."
    weatherMessage.textContent = ""

    fetch(`/weather?address=${formInput.value}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                errorMessage.textContent = data.error + "!"
            } else {
                errorMessage.textContent = data.location
                weatherMessage.textContent = data.forcast
                // console.log({ forcast: data.forcast, location: data.location, address: data.address })
            }
        })
})
