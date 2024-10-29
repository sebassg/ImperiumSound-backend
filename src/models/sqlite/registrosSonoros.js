import { createClient } from "@libsql/client"; // Keep Turso client
import { format } from 'date-fns'; // For date formatting
import { es } from 'date-fns/locale';
import { v4 as uuidv4, parse as uuidParse } from 'uuid';

// Create Turso client
export const turso = createClient({
    url: 'libsql://prueba-sebassg.turso.io',
    authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzAwMDA5NjQsImlkIjoiNTkzNzgwNzUtNGY5My00YTgxLTg3YTktOTdmNjI3YjIzMmFhIn0.WvJtLqZ1H6mBAmw5k2OpK-K_ZUj7A77Fk3TO-tUiJKICKvHw13q7cSeIk7ehzPlFtSSwEgmjep4PVSH_U6C8CA'
});

export class RegistroSonoroModel {
    static async getAll() {
        try {
            const consult = await turso.execute(`
                SELECT 
                    r.id AS id, 
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
            const resultConsult =consult.rows
            return resultConsult;
        } catch (e) {
            throw new Error(e);
        }
    }

    static async createRegister({ input }) {
        const { idUser, nivelSonoro, lugar } = input;
       

       
        const uuid = uuidv4();
        


        try {
            await turso.execute(
                `INSERT INTO registrosSonoros (id, lugar, nivelSonoro, autor) VALUES (?, ?, ?, ?);`, 
                [uuid, lugar, nivelSonoro, idUser]
            );
        } catch (e) {
            console.error("Error al ejecutar la consulta:", e);
            throw new Error(e);
        }

        return { idRegistro: uuid };
    }

    static async getMy({ input }) {
        const userName = input;
       

        try {
            const id = await turso.execute('SELECT id FROM users WHERE userName = ?;', [userName]);
            
            const registros = await turso.execute('SELECT id, lugar, fechaHora, nivelSonoro FROM registrosSonoros WHERE autor = ?;', [id.rows[0].id]);
            const result = registros.rows
            
            return result;
        } catch (e) {
            throw new Error(e);
        }
    }
}