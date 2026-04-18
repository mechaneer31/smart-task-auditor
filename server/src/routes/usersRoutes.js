
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

//updating user info
router.patch('/:username', (req, res) => {
    req.params.username
    res.send(`user with id ${req.params.username} updating info`)

})

//deleting user
router.delete('/:username', authenticateToken, usersControllers.deleteUser)

module.exports = router