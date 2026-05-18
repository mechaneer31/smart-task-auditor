const { Pool } = require("pg")

const pool = new Pool({
    host: "localhost",
    user: "chris",
    database: "smart_task_auditor",
    password: "pgdbpass",
    port: 5432
})

module.exports = pool