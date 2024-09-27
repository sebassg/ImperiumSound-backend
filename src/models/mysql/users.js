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

export class UserModel {
  static async getAll() {
    const [users] = await connection.query(
      "SELECT BIN_TO_UUID(id),nombre,email,passw FROM users;"
    );
    return users;
  }

  static async getById({ id }) {
    const [user] = await connection.query(
      "SELECT BIN_TO_UUID(id),nombre,email,passw FROM users WHERE BIN_TO_UUID(id) = ?;",
      [id]
    );
    console.log(user.length);
    if (!user || user.length === 0) {
      return false;
    }

    return user[0];
  }

  static async create({ input }) {
    const { nombre, email, passw, userName } = input;

    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        `INSERT INTO users (id, nombre, email, passw,userName)
          VALUES (UUID_TO_BIN("${uuid}"), ?, ?,?,?);`,
        [nombre, email, passw, userName]
      );
    } catch (e) {
      throw new Error(e);
    
    }
    const [user] = await connection.query(
      "SELECT BIN_TO_UUID(id),nombre,email,passw,userName FROM users WHERE BIN_TO_UUID(id) = ?;",
      [uuid]
    );
    return user;
  }

  static async delete({ id }) {
    try {
      await connection.query("DELETE FROM users WHERE BIN_TO_UUID(id) = ?;", [
        id,
      ]);
    } catch (e) {
      throw new Error("Error with delete user");
    }

    return true;
  }

  static async update({ id, input }) {
    // guardo input en updateFields
    const updateFields = input;
    // separo los items a cambia y sus valores por cambiar

    const fields = Object.keys(updateFields)
      .map((field) => `${field} = ?`)
      .join(", "); // items o campos a cambiar

    const values = Object.values(updateFields); // valores de los item que se cambian

    values.push(id); // se le agrega por ultimo el id por el que se encuentra el registro => *tiene que estar de ultimo
    console.log(values);
    console.log(fields);
    try {
      const [result] = await connection.query(
        `UPDATE users SET ${fields} WHERE BIN_TO_UUID(id) = ?`,
        values
      );

      if (result.affectedRows === 0) {
        return false;
      } else {
        const [user] = await connection.query(
          "SELECT BIN_TO_UUID(id),nombre,email,passw FROM users WHERE BIN_TO_UUID(id) = ?;",
          [id]
        );
        return user;
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: "An error occurred",
        error: e.sqlMessage,
      };
    }
  }
}
