const express = require('express')
const app = express()

const db = require('../../db/queries/usersQueries')


async function getUserById(req, res, next) {
    let user

    try {
        user = await db.userInfoQuery(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannont find user' })
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

    console.log("func: getUserById; user info: ", user)

    req.user = user
    next()

}

module.exports = {
    getUserById
}