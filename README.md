# ImperiumSound-backend


creacion de la db en mysql => script{

CREATE DATABASE prueba;

use prueba;

//creacion de la tabla 

CREATE TABLE users (
id BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())),
nombre 	VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
passw VARCHAR(255) NOT NULL

);

//creacion de primeros registros de prueba 

INSERT INTO users (id, nombre, email, passw) VALUES 
(UUID_TO_BIN(UUID()),"sebas","sebastian@gmail.com","sebas123"),
(UUID_TO_BIN(UUID()),"ssg","ssg@gmail.com","ssg123"),
(UUID_TO_BIN(UUID()),"juan","juan@gmail.com","juan123");

// funciones basicas de mysql (consultas)

SELECT * FROM users;
SELECT BIN_TO_UUID(id) id, nombre, email, passw FROM users;
SELECT BIN_TO_UUID(id),nombre,email,passw FROM users WHERE BIN_TO_UUID(id) = "dwidhjkbjka";
SELECT UUID() uuid;

}

