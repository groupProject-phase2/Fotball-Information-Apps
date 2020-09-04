const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/', UserController.login)
router.post('/googlesign', UserController.googleSign)

module.exports = router