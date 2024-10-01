import mysql from "mysql2/promise";

const DEFAULT_CONFIG = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "prueba",
};
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;


const connection = await mysql.createConnection(connectionString);

export class LoginModel{

    static async login({ input }){
        const {userName} = input
        
        const [valiLogin] = await connection.query('SELECT userName FROM users WHERE userName = ?;',[userName])
        if(valiLogin.length == 0) return null
            
        
        const [user] = await connection.query('SELECT BIN_TO_UUID(id) id, passw, userName, nombre FROM users WHERE userName = ?;',[userName])
        
        return user[0]
    }

}