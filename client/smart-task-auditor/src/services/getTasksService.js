
import axios from 'axios'

export const getTasks = async (token) => {

    console.log("running getTasks function...")

    const response = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
    })

    console.log("Tasks data after fetching: ", response.data)
    return response.data



}


