import mysql from "mysql2/promise";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';


const DEFAULT_CONFIG = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "prueba",
};
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

const connection = await mysql.createConnection(connectionString);

export class RegistroSonoroModel {
    static async getAll(){
        try {
            
             const [consult] = await connection.query(`
                SELECT 
                    BIN_TO_UUID(r.id) AS id, 
                    r.lugar, 
                    r.fechaHora, 
                    r.nivelSonoro, 
                    u.userName AS autor 
                FROM 
                    registrosSonoros r 
                INNER JOIN 
                    users u 
                ON 
                    r.autor = u.id;
            `);
             return consult
        }catch(e){
            throw new Error(e);
        }
        
    }

    static async createRegister({ input }) {
    
        const {idUser, nivelSonoro, lugar} = input
        const [uuidResult] = await connection.query("SELECT UUID() uuid;");
        const [{ uuid }] = uuidResult;
        try{

            await connection.query(
                `INSERT INTO registrosSonoros (id, lugar, nivelSonoro, autor) VALUES (UUID_TO_BIN(?), ?, ?, UUID_TO_BIN(?));`, 
                [uuid, lugar, nivelSonoro, idUser]
            );
        }catch(e){
            console.error("Error al ejecutar la consulta:", e);
            throw new Error(e);
            
        }
  

        return { idRegistro: uuid }

    }
    static async getMy( { input }){
        const  userName  = input
       

        try{


             const [id] =  await connection.query('SELECT BIN_TO_UUID(id) id FROM users WHERE userName = ?;',[userName])
             console.log(id)
             const [registros] = await connection.query('SELECT BIN_TO_UUID(id) id,lugar,fechaHora, nivelSonoro FROM registrosSonoros WHERE BIN_TO_UUID(autor) = ?;',[id[0]])
             const result = registros.map(registro => {
                const fecha = new Date(registro.fechaHora);
                
             
                const fechaFormateada = format(fecha, 'dd/MM/yyyy HH:mm:ss', { locale: es });
            
                return {
                    ...registro,
                    fechaHora: fechaFormateada, 
                    autor: userName
                };
            });
            return result

        }catch(e) {
            throw new Error(e)
        }
    }
}
