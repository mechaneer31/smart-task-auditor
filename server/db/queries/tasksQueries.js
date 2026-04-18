// database connection is established in pool.js

const pool = require('.././pool')

async function createNewTaskQuery(title, description, priority, category, user_id) {
    const sqlText = `
        INSERT INTO tasks (title, description, priority, category, user_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `;

    const result = await pool.query(sqlText, [title, description, priority, category, user_id])

    return result.rows[0]
}

async function getAllTasksQuery(user_id) {
    const sqlText = `
        SELECT * FROM tasks
        WHERE user_id = $1
    `;

    const result = await pool.query(sqlText, [user_id])

    return result
}

async function getSingleTaskQuery(user_id, task_id) {
    const sqlText = `
        SELECT * FROM tasks
        WHERE user_id = $1 AND id = $2
    `;

    const result = await pool.query(sqlText, [user_id, task_id])

    return result
}

module.exports = {
    createNewTaskQuery,
    getAllTasksQuery,
    getSingleTaskQuery
}