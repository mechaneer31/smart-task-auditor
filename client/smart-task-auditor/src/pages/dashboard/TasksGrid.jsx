

// Imported Pages
import { Task } from './Task'


export function TasksGrid({ tasks, setTasks, token }) {
    console.log("TasksGrid function; tasks: ", tasks)


    return (
        <div className="tasks-grid">
            {tasks.map((task) => {
                return (

                    <Task
                        key={task.id}
                        task={task}
                        tasks={tasks}
                        setTasks={setTasks}
                        token={token}

                    />

                )
            })}
        </div>

    )
}
