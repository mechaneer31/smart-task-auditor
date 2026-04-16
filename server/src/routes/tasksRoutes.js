

const express = require('express')
const router = express.Router()



//getting all users
router.get('/', (req, res) => {
    res.send("display all tasks")
})

//display one task
router.get('/:id', (req, res) => {
    req.params.id
})

//create a task
router.post('/', (req, res) => {

})

//update a task
router.patch('/:id', (req, res) => {

})

//deleting a task
router.delete('/:id', (req, res) => {

})

module.exports = router