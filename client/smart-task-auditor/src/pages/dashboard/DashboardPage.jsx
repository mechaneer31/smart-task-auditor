// Imported React Dependencies
import { useState, useEffect } from 'react'

//Imported Utilities
import axios from 'axios'

// Imported Pages
import { TasksGrid } from '../dashboard/TasksGrid'
import { Header } from '../Header'
import { getTasks } from '../../services/getTasksService'
import { FetchTasks } from '../../components/FetchTasks'



export function DashboardPage({ token, setToken, setUserData }) {
    const [tasks, setTasks] = useState([])

    FetchTasks({ token, setTasks, tasks })





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
                <TasksGrid
                    tasks={tasks}
                    setTasks={setTasks}
                    token={token}
                />
            </div>

        </>

    )
}