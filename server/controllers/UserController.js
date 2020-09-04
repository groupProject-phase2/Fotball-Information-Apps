const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")
const { InvalidEmailOrPassword } = require("../helpers/error")

class UserController {
  static async register(req, res, next) {
    try {
      let { email, password, city } = req.body
      const user = await User.create({ email, password, city })
      res.status(201).json({
        msg: "Register Success",
        id: user.id,
        email: user.email,
        city: user.city,
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body
      const user = await User.findOne({
        where: {
          email,
        },
      })
      if (!user) {
        throw new InvalidEmailOrPassword()
      } else {
        let compare = comparePassword(password, user.password)
        if (!compare) {
          throw new InvalidEmailOrPassword()
        } else {
          let payload = {
            id: user.id,
            email: user.email,
          }
          let access_token = generateToken(payload)
          let city = user.city
          res.status(200).json({ access_token, city })
        }
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController
