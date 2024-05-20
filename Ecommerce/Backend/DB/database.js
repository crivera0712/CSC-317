import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
}).promise();
export default pool;

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
            port: process.env.MYSQL_PORT,
        });
        console.log('Connected to the database!');
        await connection.end();
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

testConnection();



//returns array of users
export async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM users")
    return rows
}

export async function userLogin(email, password) {
    try {
        const [rows] = await pool.query(`
            SELECT * 
            FROM users
            WHERE email = ?
            AND password = ?
        `, [email, password]);
        
        if (rows.length === 0) {
            console.log("No user found with given email and password");
            return null;
        }
        
        const user = rows[0];
        const id = user.id;
        return await getUser(id);
    } catch (error) {
        console.error("Error during userLogin query:", error);
        throw error;
    }
}



export async function getUser(id){
    const [rows] = await pool.query(`
    SELECT *
    FROM users
    WHERE id = ?
    `,[id])
    return rows[0]
    
}

export async function createUser(first_name, last_name, email, password){
    const [result] = await pool.query(`
    INSERT INTO users (first_name, last_name, email, password)
    VALUES (?,?,?,?)`
    , [first_name, last_name, email, password])
    const id = result.insertId
    return getUser(id)
}




