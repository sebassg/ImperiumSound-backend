# ImperiumSound-backend

#paso para iniciar el proyecto
1. instalar dependecias (npm install )
2. instalar el gestor de servidores de db (https://dbngin.com) u otro 
   a. crear una base de datos sin contraseña de mysql (puede tener cualquier nombre)
3. instalar el editor de mysql (https://dev.mysql.com/downloads/workbench/)
   a. abrir la insancia de la base de datos creada con dbngin y ejecutar el script de mysql 
4. iniciar (npm run dev) y verificar los datos del puerto en los models y la conneccion de la databese


creacion de la db en mysql => script{

CREATE DATABASE prueba;

use prueba;


CREATE TABLE users (
id BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())),
nombre 	VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
passw VARCHAR(255) NOT NULL,
userName varchar(50) NOT null unique


);

}



----------> mas comandos sql de desarrollo

SELECT * FROM users; // este enlista todos los resgistros de la abla users
SET SQL_SAFE_UPDATES = 0; // quita la proeccion de delete 
DELETE FROM users; // elimina todos los registros de la tabla users
DROP TABLE users; // elimina tabla y su estructura
