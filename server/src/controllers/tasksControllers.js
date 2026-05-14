
const db = require('../../db/queries/tasksQueries.js')


async function createNewTask(req, res) {
    //get title, description, priority and category
    const { title, description, priority, category } = req.body

    //jwt sets up a user request that has users id, username and first_name
    const user_id = req.user.userId
    //console.log("create new task function before adding to database; user_id: ", user_id)

    try {
        const newTask = await db.createNewTaskQuery(
            title,
            description,
            priority,
            category,
            user_id
        )

        return res.status(201).json(newTask)

    } catch (err) {
        console.error("Error creating task: ", err.message)
        res.status(500).json({ message: "Could not create task" })
    }
}


async function getAllTasks(req, res) {
    const user_id = req.user.userId

    try {
        const { rows } = await db.getAllTasksQuery(user_id)

        return res.status(200).json(rows)

    } catch (err) {
        console.error("Error getting all tasks: ", err.message)
        res.status(500).json({ message: "Error getting all tasks" })
    }
}

async function getSingleTask(req, res) {
    const user_id = req.user.userId
    const task_id = req.params.id

    //console.log("before single task query")
    //console.log("user_id: ", user_id)
    //console.log("task_id: ", task_id)

    try {
        const { rows } = await db.getSingleTaskQuery(task_id, user_id)

        if (rows.length === 0) {
            return res.status(401).json({ message: "Unauthorized to view that task" })
        }

        return res.status(200).json(rows)
    } catch (err) {
        console.error("Error getting single task: ", err.message)
        res.status(500).json({ message: "Error getting single task" })

    }
}

async function deleteTask(req, res) {
    const user_id = req.user.userId
    const task_id = req.params.id

    try {

        const result = await db.deleteTaskQuery(task_id, user_id)

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Task to delete not found" })
        }

        res.status(200).json({ message: "Task deleted" })

    } catch (err) {
        console.error("Error deleting task: ", err.message)
        res.status(500).json({ message: "Error deleting task" })
    }


}


module.exports = {
    createNewTask,
    deleteTask,
    getAllTasks,
    getSingleTask
}