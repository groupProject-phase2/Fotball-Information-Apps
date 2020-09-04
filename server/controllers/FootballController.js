const axios = require("axios")

class FootballController {
  static async fixtures(req, res, next) {
    try {
      const { from, to } = req.params
      const endpoint = "https://allsportsapi.com/api/football"
      const response = await axios.get(endpoint, {
        params: {
          met: "Fixtures",
          APIkey: process.env.FOOTBALL_API_KEY,
          from: from || "2020-09-12",
          to: to || "2020-09-12",
        },
      })
      let result = []
      response.data.result.forEach((data) => {
        const {
          event_home_team,
          event_away_team,
          home_team_logo,
          away_team_logo,
          event_date,
          league_name,
        } = data
        result.push({
          event_home_team,
          event_away_team,
          home_team_logo,
          away_team_logo,
          event_date,
          league_name,
        })
      })
      res.status(200).json({ data: result })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = FootballController
