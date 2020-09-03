const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require('../helpers/jwt')

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
      console.log(err)
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body
      const user = await User.findOne({
        where : {
          email
        }
      })
      if(!user) {
        throw { msg: 'invalid user or password'}
      } else {
        let compare = comparePassword(password, user.password)
        if(!compare) {
          throw { msg: 'invalid user or password'}
        } else {
          let payload = {
            id: user.id,
            email: user.email
          }
          let access_token = generateToken(payload)
          let city = user.city
          res.status(200).json({access_token, city})
        }
      }
    } catch(err) {
      console.log(err)
    }
  }
}

module.exports = UserController
