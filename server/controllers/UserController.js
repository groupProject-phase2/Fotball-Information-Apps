const { User } = require("../models")

class UserController {
  static register(req, res, next) {}

  static login(req, res, next) {
    res.json({ ok: true })
  }
}

module.exports = UserController
