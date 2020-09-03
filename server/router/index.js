const router = require('express').Router()
const RegisterController = require('./registerRouter')


router.use('/register', RegisterController)


module.exports = router