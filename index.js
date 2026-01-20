require("dotenv").config();
const { Sequelize } = require("sequelize");
const express = require("express");
const app = express();

// DATABASE_URL (EXTERNAL_DATABASE_URL de Render).
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  // Render requiere de conexiones SSL, por eso se le agrega el objeto "dialectOptions".
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

app.get("/prueba", (req, res) => {
  res.send("funciona!");
});

const PORT = process.env.PORT || 3001;

const iniciarServidor = async () => {
  try {
    // La función de "sequelize.authenticate()" es verificar si Sequelize puede conectarse a la bd con las credenciales que se le proporcionaron.
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida con éxito.");
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
    // Se detiene la app si no hay conexión.
    return process.exit(1)
  }
};

iniciarServidor()
