
const express = require("express")
const router = express.Router()

const usersControllers = require('../controllers/usersControllers.js')
const { getUserById } = require('../middleware/getUserById.js')
const { encryptPassword } = require('../middleware/encryptPassword.js')
const { authenticateToken } = require('../middleware/authenticateToken.js')



//getting user data
router.get('/:username', authenticateToken, getUserById, usersControllers.fetchUserInfo)

//updating user data
router.patch('/:username', authenticateToken, encryptPassword, usersControllers.updateUserInfo)

//deleting user
router.delete('/:username', authenticateToken, usersControllers.deleteUser)

module.exports = router