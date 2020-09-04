const router = require('express').Router()
const FootballController = require('../controllers/FootballController')
// const authentication = require('../middlewares/authentication')

// router.use(authentication)

router.get('/fixtures', FootballController.fixtures)

module.exports = router