const router = require("express").Router()
const UserContoller = require("../controllers/UserController")

router.post("/login", UserContoller.login)
router.post("/register", UserContoller.register)

module.exports = router
