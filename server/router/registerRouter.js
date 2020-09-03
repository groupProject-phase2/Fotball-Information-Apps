const router = require("express").Router()
const UserController = require("../controllers/UserController")

router.post("/", UserController.register)

module.exports = router
