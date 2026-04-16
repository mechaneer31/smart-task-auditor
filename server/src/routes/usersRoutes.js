
const express = require("express")

const router = express.Router()




//getting one user data
router.get('/:id', (req, res) => {
    req.params.id
    res.send(`user with id ${req.params.id} info`)
})

//creating user
router.post('/', (req, res) => {
    res.send("creating a new user")

})

//updating user info
router.patch('/:id', (req, res) => {
    req.params.id
    res.send(`user with id ${req.params.id} updating info`)

})

//deleting user
router.delete('/:id', (req, res) => {
    req.params.id
    res.send(`user with id ${req.params.id} is deleting account`)
})

module.exports = router