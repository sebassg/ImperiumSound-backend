import { createClient } from "@libsql/client";



export const turso = createClient({
  url: 'libsql://prueba-sebassg.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzAwMDA5NjQsImlkIjoiNTkzNzgwNzUtNGY5My00YTgxLTg3YTktOTdmNjI3YjIzMmFhIn0.WvJtLqZ1H6mBAmw5k2OpK-K_ZUj7A77Fk3TO-tUiJKICKvHw13q7cSeIk7ehzPlFtSSwEgmjep4PVSH_U6C8CA'
});

export class UseerModel {
    static async getAlll() {
        try {
            const result = await turso.execute(
              "SELECT LOWER(HEX(id)) AS id, nombre, email, passw FROM users;"
            );
            const users = result.rows; 
            return users;
          } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
          }
    }
    static async getById({ id }) {
        
        try{
            const result = await turso.execute(
                "SELECT LOWER(HEX(id)) as id,nombre,email,passw FROM users WHERE LOWER(HEX(id)) = ?;",
                [id]
              );
              
            const user = result.rows
            return user
            }catch(e){

                console.log(e)

            }

        }
        static async create({ input }) {
            const { nombre, email, passw, userName } = input;
        
            
        
            const validacionUserName = await turso.execute('SELECT userName FROM users WHERE userName = ?;',[userName])
        
        
            if(validacionUserName.length === 1) {return {mensaje: "el usuario ya existe"}} 
            const uuidResult = await turso.execute("SELECT UUID() uuid;");
            const  uuid = uuidResult.rows;
            console.log(uuid)
        
            
            try {
              await turso.execute(
                `INSERT INTO users (id, nombre, email, passw,userName)
                  VALUES (LOWER("${uuid}"), ?, ?,?,?);`,
                [nombre, email, passw, userName]
              );
            } catch (e) {
              throw new Error(e);
          
            }
            const [user] = await turso.execute(
              "SELECT LOWER(HEX(id)),userName FROM users WHERE LOWER(HEX(?)) = ?;",
              [uuid]
            );
        
            return user;
          }
       
           
    
 }
  