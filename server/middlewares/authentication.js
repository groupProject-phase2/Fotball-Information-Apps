const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req, res, next) {
    const { access_token } = req.headers
    try {
        if (!access_token) throw { name: "UNAUTHORIZED" }
        else {
            const decoded = verifyToken(access_token)
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })

            if (!user) throw { name: "UNAUTHORIZED" }
            else {
                req.loggedInUser = decoded
                next()
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authentication