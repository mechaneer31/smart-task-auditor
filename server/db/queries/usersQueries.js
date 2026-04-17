
// database connection is established in pool.js

const pool = require('.././pool')

async function createUserQuery(username, password, first_name) {
    const sqlText = `
        INSERT INTO users (username, password, first_name)
        VALUES ($1, $2, $3)
        RETURNING *
    `;

    const result = await pool.query(sqlText, [username, password, first_name])

    return result.rows[0]
}


async function userInfoQuery(id) {
    console.log("func: userInfoQuery; id to find: ", id)
    const sqlText = `
        SELECT * FROM users
        WHERE id = ($1)
    `;

    const result = await pool.query(sqlText, [id])

    return result.rows[0]

}


async function deleteUserQuery(id) {
    console.log("func: userInfoQuery; id to delete: ", id)
    const sqlText = `
        DELETE FROM users
        WHERE id = ($1)
    `;

    const result = await pool.query(sqlText, [id])

}



module.exports = {
    createUserQuery,
    userInfoQuery,
    deleteUserQuery
}