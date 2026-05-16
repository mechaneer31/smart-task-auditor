

const bcrypt = require('bcryptjs')

async function encryptPassword(req, res, next) {

    //encrypting password gets used by patching method to update user info which may
    //or may not contain password so the if statement makes sure a password exists to hash
    if (req.body && req.body.password) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)

        req.body.password = hash
    }
    next()
}



module.exports = {
    encryptPassword
}