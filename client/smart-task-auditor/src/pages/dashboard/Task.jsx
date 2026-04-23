
import axios from 'axios'


export function Task({ task, tasks, setTasks, token }) {

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`/api/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            const updatedTasks = tasks.filter(task => task.id !== taskId)

            setTasks(updatedTasks)

        } catch (err) {
            console.error("Delete failed: ", err)

        }
    }


    return (

        <div
            className="task-container"
        >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span>Priority: {task.priority}</span>
            <br></br>
            <span>Category: {task.category}</span>
            <button
                onClick={() => handleDelete(task.id)}
            >Delete</button>
        </div>
    )
}

