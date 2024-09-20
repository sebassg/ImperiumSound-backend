import mysql from "mysql2/promise"
import { randomUUID } from 'node:crypto'

const DEFAULT_CONFIG = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'prueba'
  }
  const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG
  
  const connection = await mysql.createConnection(connectionString)
  


export class userModel {
    static async getAll() {
        const [users] = await connection.query("SELECT BIN_TO_UUID(id),nombre,email,passw FROM users;")
        return users
        
    }

    static async getId({ id }) {

        const [user] = await connection.query("SELECT BIN_TO_UUID(id),nombre,email,passw FROM users WHERE BIN_TO_UUID(id) = ?;",[id]) 
       return user
    }

    static async create({ input }) {
        
    }

    static async delete({id}){
       

    }

    static async update({ id, input }){
        
    }
}