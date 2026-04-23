import { useState } from 'react'
import axios from 'axios'


export function TaskForm({ token, onTaskAdded }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("")
    const [category, setCategory] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title) return alert("Title is required")
        if (!priority) return alert("Priority is required")
        if (!category) return alert("Category is required")

        try {

            const response = await axios.post('/api/tasks',
                { title, description, priority, category },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            setTitle("")
            setDescription("")
            setPriority("")
            setCategory("")

            onTaskAdded()

        } catch (err) {
            console.error("Failed to create task", err)
        }
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="task-form"
        >
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
            />

            <br></br>

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (Optional)"
            />

            <br></br>

            <input
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                placeholder="Priority"
            />

            <br></br>

            <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
            />
            <button type='submit'> Add Task </button>

        </form>
    )
}