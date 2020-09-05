const router = require("express").Router()
const RegisterController = require("./registerRouter")
const loginRouter = require('./loginRouter')
const footballRouter = require('./footballRouter')
const newsRouter = require("./newsRouter")
const weatherRouter = require('./weatherRouter')

router.get('/', (req, res) => res.status(200).json({ msg: 'tes' }))
router.use("/news", newsRouter)
router.use("/register", RegisterController)
router.use("/login", loginRouter)
router.use("/football", footballRouter)
router.use('/weather', weatherRouter)


module.exports = router
