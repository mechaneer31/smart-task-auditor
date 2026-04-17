const { Client } = require("pg")


const SQL = `

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL
);


CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    task_details VARCHAR(255),
    is_complete BOOLEAN,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
    created_at TIMESTAMP NOT NULL
);



CREATE TABLE IF NOT EXISTS refresh_tokens (
    token VARCHAR(255) PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    revoked_at TIMESTAMP,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

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