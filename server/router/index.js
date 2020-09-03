const router = require("express").Router()
const RegisterController = require("./registerRouter")
const loginRouter = require('./loginRouter')


router.use("/register", RegisterController)
router.use("/login", loginRouter)

module.exports = router
