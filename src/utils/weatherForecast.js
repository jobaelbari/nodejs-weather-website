const request = require('postman-request')

const weatherForecast = (longitude,latitude, location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6d4db3183ff2209da4ac6a769585c0cf&query='+latitude+','+longitude
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location',undefined)
        } else {
            temp = body.current.temperature
            feelsLike = body.current.feelslike
            description = body.current.weather_descriptions[0]
            callback(error, {
                Prediction  : description+". It is currently "+temp+" degress out. It feels like "+feelsLike+" degrees out.",
                Address     : location
        })
        }
    })
}

module.exports = weatherForecast