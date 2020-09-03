const { User } = require('../models')

class UserController {
    static async register(req, res, next) {
        try {
            let { email, password, city } = req.body
            const user = await User.create({ email, password, city })
            res.status(201).json({
                msg: 'Register Success',
                id : user.id,
                email : user.email,
                city : user.city
            })
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = UserController