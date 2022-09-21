const request = require("request")


const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGtyZXN0MSIsImEiOiJja3c4dGQ3OGEwbGgzMzBxbTQyYno4bDRvIn0.DiBU10i_SSF4laIYEK_srA&limit=1"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("unable to connect to internet", undefined)
        } else if (body.features.length == 0) {
            callback("invalid location input, check again", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode