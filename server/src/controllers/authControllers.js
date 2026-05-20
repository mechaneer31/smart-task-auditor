const express = require('express')
const db = require('../../db/queries/usersQueries.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




async function createNewUser(req, res) {
    const { username, password, first_name, email } = req.body

    try {
        const newUser = await db.createUserQuery(username, password, first_name, email)

        return res.status(201).json(newUser)
    } catch (err) {

        next(error)
    }
}




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
            userId: user.id
        }

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).json({
            message: "Login successful",
            token: token,
            userId: user.id,
            username: user.username,
            firstName: user.first_name
        })

    } catch (err) {
        next(error)

    }
}

module.exports = {
    createNewUser,
    userLogin
}