const router = require("express").Router()
const RegisterController = require("./registerRouter")
const loginRouter = require('./loginRouter')
const footballRouter = require('./footballRouter')

router.use("/register", RegisterController)
router.use("/login", loginRouter)
router.use("/football", footballRouter)

module.exports = router
