const express = require('express')
const db = require('../../db/queries/usersQueries.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




async function userLogin(req, res) {


    const { username: usernameGiven, password: passwordGiven } = req.body

    try {
        const user = await db.userLoginQuery(usernameGiven)

        if (user.length === 0) {
            return res.status(401).json({ message: "Invalid credentials " })
        }

        const match = await bcrypt.compare(passwordGiven, user.password)

        if (!match) {
            return res.status(401).json({ message: "Invalid credentials " })
        }


        const payload = {
            message: "Login successful",
            userId: user.id,
            username: user.username,
            userFirstName: user.first_name
        }

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).json({
            message: "Login successful",
            token: token
        })

    } catch (err) {
        res.status(500).json({ message: err.message })

    }
}


const fetchUserInfo = (req, res) => {

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

        return res.status(201).json(newUser)
    } catch (err) {

        res.status(400).json({ message: err.message })
    }
}


async function deleteUser(req, res) {
    try {
        console.log("delete users params: ", req.params.username)
        const result = await db.deleteUserQuery(req.params.username)

        if (result.rowCount === 0) return res.status(404).json({
            message: "User not found"
        })

        return res.status(200).json({ message: "User deleted" })

    } catch (err) {

        res.status(500).json({ message: err.message })
    }
}





module.exports = {
    userLogin,
    fetchUserInfo,
    createNewUser,
    deleteUser
}