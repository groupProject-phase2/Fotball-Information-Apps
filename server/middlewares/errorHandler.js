const { ValidationError } = require("sequelize")
const { JsonWebTokenError } = require("jsonwebtoken")
const { ErrorStatus } = require("../helpers/error")

function errorHandler(error, req, res, next) {
  if (error instanceof ValidationError) {
    const errors = error.errors.map((e) => e.message)
    return res.status(400).json({ error: errors })
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ error: "Invalid token" })
  }

  if (error instanceof ErrorStatus) {
    return res.status(error.statusCode).json({ error: error.message })
  }

  console.log(error)

  res.status(500).json({ error: error && error.message })
}

module.exports = errorHandler
