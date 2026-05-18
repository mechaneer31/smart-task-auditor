const express = require('express')
const db = require('../../db/queries/usersQueries.js')
const dbDynamic = require('../../db/pool.js')
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
    const { username, password, first_name, email } = req.body

    try {
        const newUser = await db.createUserQuery(username, password, first_name, email)

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

async function updateUserInfo(req, res) {

    //console.log(req)
    const userId = req.user.userId
    const { ...fieldsToUpdate } = req.body

    if (!userId) {
        return res.status(403).json({ message: "No userId provided" })
    }


    const allowedUpdates = ['username', 'password', 'first_name', 'email']

    const actualUpdates = Object.keys(fieldsToUpdate).filter(key => allowedUpdates.includes(key) && fieldsToUpdate[key] !== undefined)

    if (actualUpdates.length === 0) {
        return res.status(400).json({ message: "No valid fields provided" })
    }

    const setAssignments = actualUpdates.map((columnName, index) => `"${columnName}" = $${index + 1}`)
    const setClause = setAssignments.join(', ')
    const queryText = `
    UPDATE users 
    SET ${setClause}, updated_at = NOW()
    WHERE id = $${actualUpdates.length + 1} 
    RETURNING id, username, first_name, email`

    const queryValues = [...actualUpdates.map(key => fieldsToUpdate[key]), userId]

    try {

        const result = await dbDynamic.query(queryText, queryValues)

        if (result.rowCount === 0) {
            return res.status(400).json({ message: "User not found" })
        }

        res.status(200).json({ message: "Update successful", user: result.rows[0] })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Database error" })
    }


}



module.exports = {
    userLogin,
    fetchUserInfo,
    createNewUser,
    deleteUser,
    updateUserInfo
}