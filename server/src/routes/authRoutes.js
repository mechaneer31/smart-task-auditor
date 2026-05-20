const express = require("express")
const router = express.Router()

const authControllers = require('../controllers/authControllers.js')
const { encryptPassword } = require('../middleware/encryptPassword.js')


//creating user
router.post('/register', encryptPassword, authControllers.createNewUser)

//logging in user
router.post('/login', authControllers.userLogin)

module.exports = router