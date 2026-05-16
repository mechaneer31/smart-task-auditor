
const express = require("express")

const router = express.Router()
const usersControllers = require('../controllers/usersControllers.js')
const { getUserById } = require('../middleware/getUserById.js')
const { encryptPassword } = require('../middleware/encryptPassword.js')
const { authenticateToken } = require('../middleware/authenticateToken.js')




//creating user
router.post('/', encryptPassword, usersControllers.createNewUser)

router.post('/login', usersControllers.userLogin)

//getting user data
router.get('/:username', authenticateToken, getUserById, usersControllers.fetchUserInfo)

router.patch('/:username', authenticateToken, getUserById, encryptPassword, usersControllers.updateUser)

//deleting user
router.delete('/:username', authenticateToken, usersControllers.deleteUser)

module.exports = router