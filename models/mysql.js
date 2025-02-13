import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

dotenv.config()

export const turso = createClient({
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
})

turso.execute(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email STRING NOT NULL UNIQUE
)`)

export async function addEmail(email) {
    try {
        const response = await turso.execute({
            sql: 'INSERT INTO users (email) values (?)',
            args: [email]
        })
        return response;
    } catch(error) {
        console.error(error)
    }
}