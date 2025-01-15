const { Sequelize } = require("sequelize");
require("dotenv").config();

// Configuración de la base de datos
const sequelize = new Sequelize(
 process.env.DB_NAME, // Nombre de la base de datos
 process.env.DB_USER, // Usuario
 process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST, // Dirección del servidor
    dialect: "mysql", // Motor de base de datos
  }
);


module.exports = { sequelize };

//const mysql = require("mysql2/promise");
//require("dotenv").config();

//const db = mysql.createPool({
//    host: process.env.DB_HOST,
//    user: process.env.DB_USER,
//    password: process.env.DB_PASSWORD,
//    database: process.env.DB_NAME,
//});

//module.exports = db;



