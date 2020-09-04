const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")
const { InvalidEmailOrPassword } = require("../helpers/error")
const {OAuth2Client} = require('google-auth-library');

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

  static async googleSign(req, res, next) {
    let { id_token } = req.body
    try {
      const client = new OAuth2Client(process.env.CLIENT_GOOGLE_ID);
      const ticket = await client.verifyIdToken({
          idToken: id_token,
          audience: process.env.CLIENT_GOOGLE_ID,
      });
      const payload = ticket.getPayload();
      const user = await User.findOne({
        where : {
          email: payload.email
        }
      })
      if(user) {
        const access_token = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({access_token})
      } else {
        const newUser = User.create({
          email: payload.email,
          password: 'googlelogin',
          city: 'Jakarta'
        })
        const access_token = generateToken({
          id: newUser.id,
          email: newUser.email
        })
        console.log(access_token, city)
        res.status(200).json({access_token, city:newUser.city})
      }
    } catch(err) {
      console.log(err)
    }
  }
}

module.exports = UserController
