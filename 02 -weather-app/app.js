const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const address = process.argv[2]
if (!address) {
    console.log("location was not provided")
} else {
    geocode(address, (error, { latitude, longitude, location }) => {
        if (error) {
            return console.log(error)
        }
        forecast(latitude, longitude, (error, forcast) => {
            if (error) {
                return console.log(error)
            }
            console.log("Location:", location)
            console.log("Data:", forcast)
        })
    })

}




