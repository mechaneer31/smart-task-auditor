const fs = require('fs')
const path = require('path')
const { Client } = require('pg')
require('dotenv').config()

const client = new Client({
    connectionString: process.env.DATABASE_URL
})

async function run() {

    //grab the filename from the command line
    const fileName = process.argv[2]

    if (!fileName) {
        console.error("Please provide a filename: npm run migrate -- <filename>")
        process.exit(1)
    }

    const filePath = path.join(__dirname, fileName)

    try {

        console.log("Searching for file at: ", filePath)
        // 1. Read the SQL content
        const sql = fs.readFileSync(filePath, 'utf8')

        await client.connect()

        // 2. Execute the SQL
        console.log(`Executing migration: ${fileName}...`)
        await client.query(sql)

        console.log("Migration successful!")
    } catch (err) {
        console.error("Migration failed: ", err.message)
    } finally {
        await client.end()
    }
}

run()