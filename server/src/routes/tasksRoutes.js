

const express = require('express')
const { authenticateToken } = require('../middleware/authenticateToken')
const tasksControllers = require('../controllers/tasksControllers.js')
const router = express.Router()



//create task
router.post('/', authenticateToken, tasksControllers.createNewTask)

router.get('/', authenticateToken, tasksControllers.getAllTasks)

router.get('/:id', authenticateToken, tasksControllers.getSingleTask)

module.exports = router