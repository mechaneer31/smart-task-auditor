// Imported React Dependencies
import { useState, useEffect } from 'react'

//Imported Utilities
import axios from 'axios'

// Imported Pages
import { TasksGrid } from '../dashboard/TasksGrid'
import { Header } from '../Header'
import { getTasks } from '../../services/getTasksService'
import { TaskForm } from '../TaskForm'



export function DashboardPage({ token, setToken, setUserData }) {
    const [tasks, setTasks] = useState([])
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isTasksLoaded, setIsTasksLoaded] = useState(false)


    const loadTasks = async () => {

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

    useEffect(() => {
        if (token) loadTasks()

    }, [token])


    console.log('dashboard page')

    return (
        <>
            <Header
                setToken={setToken}
                setUserData={setUserData}
            />
            <h1>DASHBOARD</h1>

            <div>
                <h2>Your Tasks</h2>
                <div>
                    <button
                        onClick={() => setIsFormVisible(!isFormVisible)}>
                        {isFormVisible ? 'cancel' : '+ Add New Task'}
                    </button>
                </div>

                {isFormVisible && (
                    <TaskForm
                        token={token}
                        onTaskAdded={() => {
                            loadTasks()
                            setIsFormVisible(false)
                        }}
                    />
                )}


                <TasksGrid
                    tasks={tasks}
                    setTasks={setTasks}
                    token={token}
                />
            </div>

        </>

    )
}