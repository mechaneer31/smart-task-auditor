const { Pool } = require("pg")

module.exports = new Pool({
    host: "localhost",
    user: "chris",
    database: "smart_task_auditor",
    password: "pgdbpass",
    port: 5432
})