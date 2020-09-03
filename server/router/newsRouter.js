const router = require("express").Router()
const NewsController = require("../controllers/NewsController")

router.get("/", NewsController.findAll)

module.exports = router
