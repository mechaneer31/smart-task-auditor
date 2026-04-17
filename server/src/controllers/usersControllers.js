const express = require('express')
const app = express()
const db = require('../../db/queries/usersQueries.js')
const { getUserById } = require('..//middleware/getUserById.js')


const fetchUserInfo = (req, res) => {
    console.log("fetchUserInfo; req.user: ", req.user)
    const user = req.user

    if (!user) {
        res.status(404).json({ message: "User not found " })
    }

    res.json({ username: user.username, first_name: user.first_name })
}

async function createNewUser(req, res) {
    const { username, password, first_name } = req.body

    try {
        const newUser = await db.createUserQuery(username, password, first_name)
        console.log("user created: ", newUser)
        return res.status(201).json(newUser)
    } catch (err) {
        console.log("error creating user")
        res.status(400).json({ message: err.message })
    }
}


async function deleteUser(req, res) {
    try {
        const removeUser = await db.deleteUserQuery(req.params.id)
        console.log("deleted user with id: ", req.params.id)
        res.status(200).json({ message: "User deleted" })

    } catch (err) {
        console.log("error deleting user")
        res.status(500).json({ message: err.message })
    }
}



module.exports = {
    fetchUserInfo,
    createNewUser,
    deleteUser
}