const express = require('express')
const db = require('../../db/queries/usersQueries.js')
const dbDynamic = require('../../db/pool.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const fetchUserInfo = (req, res) => {

    const user = req.user

    if (!user) {
        res.status(404).json({ message: "User not found " })
    }

    res.json({ username: user.username, first_name: user.first_name, email: user.email })
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

        next(error)
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
        next(error)
    }


}



module.exports = {
    fetchUserInfo,
    deleteUser,
    updateUserInfo
}