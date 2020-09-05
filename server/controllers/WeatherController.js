const axios = require('axios')

class WeatherController {
    static async getWeather(req, res, next) {
        try {
            const endpoint = 'http://api.weatherstack.com/current'
            const { query } = req.query
            const response = await axios.get(endpoint, {
                params : {
                    access_key: process.env.WEATHER_API_KEY,
                    query: query || 'Jakarta'
                }
            })
            let image = response.data.current.weather_icons[0]
            let desc = response.data.current.weather_descriptions[0]
            res.status(200).json({ image, desc })

        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = WeatherController