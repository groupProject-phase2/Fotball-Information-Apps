const router = require("express").Router()
const RegisterController = require("./registerRouter")
const newsRouter = require("./newsRouter")

router.use("/register", RegisterController)
router.use("/news", newsRouter)

module.exports = router
