const express = require('express')
const app = express()

const db = require('../../db/queries/usersQueries')


async function getUserById(req, res, next) {
    let user

    try {
        user = await db.userInfoByIdQuery(req.params.id)
        if (user === null) {
            return res.status(404).json({ message: 'Cannont find user' })
        }

    } catch (err) {
        next(error)
    }



    req.user = user
    next()

}

module.exports = {
    getUserById
}