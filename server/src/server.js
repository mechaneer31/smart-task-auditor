

//establish using Express
const express = require("express")

//create app variable to configure the server
const app = express()




//establish a variable for accessing server port information
const PORT = process.env.PORT || 5000

//set up to be able to use JSON
app.use(express.json())

//establish router for each route file:
const authRouter = require('.././src/routes/authRoutes.js')
app.use('/api', authRouter)

const usersRouter = require('.././src/routes/usersRoutes.js')
app.use('/api/users', usersRouter)

const tasksRouter = require('.././src/routes/tasksRoutes.js')
app.use('/api/tasks', tasksRouter)

//Global Error Handling... All routers must go above this code
app.use((err, req, res, next) => {
    console.error("ALERT [Global Error]:", err.stack)

    if (err.code === '23505') {
        // Unique viloation; ex: username or password already exists
        return res.status(409).json({ error: "Conflict: This record already exists." })
    }

    if (err.message.includes("invalid input value for enum")) {
        //Custom enum validation error
        return res.status(400).json({ error: "Validation error: Invalid priority level provided." })
    }

    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        error: "Internal Server Error",
        message: "Something went wrong on our end.  Please try again later."
    })


})

//activate a server listening for requests using PORT stored in .env and backup of PORT 5000
app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})