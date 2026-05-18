
// database connection is established in pool.js

const pool = require('.././pool')

async function createUserQuery(username, password, first_name, email) {
    const sqlText = `
        INSERT INTO users (username, password, first_name, email)
        VALUES ($1, $2, $3, $4)
        RETURNING username, first_name, email
    `;

    const result = await pool.query(sqlText, [username, password, first_name, email])

    return result.rows[0]
}


async function deleteUserQuery(username) {

    const sqlText = `
        DELETE FROM users
        WHERE username = $1
    `;

    const result = await pool.query(sqlText, [username])
    return result

}

async function userInfoByIdQuery(id) {

    const sqlText = `
        SELECT * FROM users
        WHERE id = ($1)
    `;

    const result = await pool.query(sqlText, [id])

    return result.rows[0]

}


async function userLoginQuery(username) {

    const sqlText = `
        SELECT * FROM users
        WHERE username = ($1)
    `;

    const result = await pool.query(sqlText, [username])


    return result.rows[0]

}



module.exports = {
    createUserQuery,
    deleteUserQuery,
    userInfoByIdQuery,
    userLoginQuery

}