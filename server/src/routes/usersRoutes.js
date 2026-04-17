
const express = require("express")

const router = express.Router()
const usersControllers = require('../controllers/usersControllers.js')
const { getUserById } = require('../middleware/getUserById.js')
const { encryptPassword } = require('../middleware/encryptPassword.js')




//creating user
router.post('/', encryptPassword, usersControllers.createNewUser)

router.post('/login', usersControllers.userLogin)

//getting user data
router.get('/:id', getUserById, usersControllers.fetchUserInfo)

//updating user info
router.patch('/:id', (req, res) => {
    req.params.id
    res.send(`user with id ${req.params.id} updating info`)

})

//deleting user
router.delete('/:id', getUserById, usersControllers.deleteUser)

module.exports = router