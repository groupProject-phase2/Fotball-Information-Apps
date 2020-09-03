const router = require('express').Router()
const FootballController = require('../controllers/FootballController')

router.get('/fixtures', FootballController.fixtures)

module.exports = router