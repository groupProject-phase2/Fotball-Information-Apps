const router = require("express").Router()
const RegisterController = require("./registerRouter")

router.get('/', (req, res) => res.status(200).json({ msg: 'tes' }))
router.use("/register", RegisterController)

module.exports = router
