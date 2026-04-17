

const bcrypt = require('bcryptjs')

async function encryptPassword(req, res, next) {

    console.log("in hashPasswod function")

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)

    console.log("hashed password: ", hash)

    req.body.password = hash
    next()
}

async function checkEncryptedPassword(req, res, next) {
    const checkPass = await bcrypt.compare(req.body.password, hash)
    if (checkPass === false) {
        return res.status(404).json({ message: "Password check failed," })
    }

    next()
}

module.exports = {
    encryptPassword,
    checkEncryptedPassword
}