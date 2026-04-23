// Imported React Dependencies
import { useEffect, useState } from 'react'


// Imported Utilities/Services
import { getTasks } from '../services/getTasksService.js'


//Imported Pages


export function FetchTasks({ tasks, setTasks, token }) {
    console.log("Running FetchTasks function... token: ", token)
    const [isTasksLoaded, setIsTasksLoaded] = useState(false)

    useEffect(() => {
        if (!token) return

        console.log("in fetch tasks useEffect... token: ", token)
        const fetchTasks = async () => {
            console.log("in fetchTasks function...")
            setIsTasksLoaded(false)
            try {
                const taskData = await getTasks(token)

                setTasks(taskData)
                console.log("Task data received: ", taskData)
                setIsTasksLoaded(true)
            } catch (err) {
                console.error("Error fetching tasks: ", err)
                setIsTasksLoaded(true)
            }

        }

        fetchTasks()

    }, [token, setTasks])

    return tasks
}

