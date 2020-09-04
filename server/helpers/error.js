class ErrorStatus extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
  }
}

class NotFoundError extends ErrorStatus {
  constructor(message = "Not Found") {
    super(404, message)
  }
}

class UnautorizedError extends ErrorStatus {
  constructor(message = "Unautorized") {
    super(401, message)
  }
}

class InternalServerError extends ErrorStatus {
  constructor(message = "Interbal Server Error") {
    super(500, message)
  }
}

class InvalidEmailOrPassword extends ErrorStatus {
  constructor(message = "Invalid Email or Password!") {
    super(400, message)
  }
}

module.exports = {
  NotFoundError,
  UnautorizedError,
  InternalServerError,
  ErrorStatus,
  InvalidEmailOrPassword,
}
