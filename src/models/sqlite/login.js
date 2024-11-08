import { createClient } from "@libsql/client";

export const turso = createClient({
    url: 'libsql://prueba-sebassg.turso.io',
    authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzAwMDA5NjQsImlkIjoiNTkzNzgwNzUtNGY5My00YTgxLTg3YTktOTdmNjI3YjIzMmFhIn0.WvJtLqZ1H6mBAmw5k2OpK-K_ZUj7A77Fk3TO-tUiJKICKvHw13q7cSeIk7ehzPlFtSSwEgmjep4PVSH_U6C8CA'
});

export class LoginModel {
    static async login({ input }) {
        const { userName } = input;

        const valiLogin = await turso.execute('SELECT userName FROM users WHERE userName = ?;', [userName]);
        
        if (valiLogin.length === 0) return null;

        const user = await turso.execute('SELECT id, passw, userName, nombre, email FROM users WHERE userName = ?;', [userName]);
        const resultUser = user.rows;
       
        

        return resultUser[0]

    }
}
