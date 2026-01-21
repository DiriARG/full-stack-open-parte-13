// Archivo que se encarga de manejar las variables de entorno.

require("dotenv").config();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
}