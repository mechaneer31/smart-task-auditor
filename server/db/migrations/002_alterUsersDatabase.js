require("dotenv").config()

const { Client } = require("pg")


const SQL = `
ALTER TABLE users
ALTER COLUMN id 
SET DEFAULT gen_random_uuid();
`;


async function main() {
    console.log("seeding...")
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    })
    await client.connect()
    await client.query(SQL)
    await client.end()
    console.log("done")
}

main();