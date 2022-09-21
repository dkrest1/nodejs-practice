const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=bb506fa77862863e6f1808e97be9cc68&query=${latitude},${longitude}&units=f`
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("unable to get your forcast, check your internet connection", undefined)
        } else if (body.error) {
            callback("unable to get location forcast", undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}, it's currently ${body.current.temperature} degree but feels like ${body.current.feelslike} degree`)
        }
    })
}

module.exports = forecast