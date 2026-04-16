

//establish using Express
const express = require("express")

//create app variable to configure the server
const app = express()




//establish a variable for accessing server port information
const PORT = process.env.PORT || 5000

//set up to be able to use JSON
app.use(express.json())

//establish router for each route file:
const usersRouter = require('.././src/routes/usersRoutes.js')
app.use('/users', usersRouter)

const tasksRouter = require('.././src/routes/tasksRoutes.js')
app.use('/tasks', tasksRouter)

//activate a server listening for requests using PORT stored in .env and backup of PORT 5000
app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})