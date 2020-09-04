const axios = require("axios")

const API_KEY = process.env.NEWS_API_KEY
const BASE_URL = "http://newsapi.org/v2/"

class NewsController {
  static async findAll(req, res, next) {
    const { country, category } = req.query
    try {
      const response = await axios.get(`${BASE_URL}/top-headlines`, {
        params: {
          country: country || "id",
          category: category || "sports",
          apiKey: API_KEY,
        },
      })

      res.status(200).json(response.data)
    } catch (ex) {
      next(ex)
    }
  }
}

module.exports = NewsController
