import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
}).promise()

//returns array of users
export async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM users")
    return rows
}

export async function getUser(id){
    const [rows] = await pool.query(`
    SELECT *
    FROM users
    WHERE id = ?
    `,[id])
    return rows[0]
    
}

export async function createUser(email, password){
    const [result] = await pool.query(`
    INSERT INTO users (email, password)
    VALUES (?,?)`
    , [email, password])
    const id = result.insertId
    return getUser(id)
}



