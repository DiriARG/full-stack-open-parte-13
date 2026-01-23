// Archivo que contiene el código para inicializar la base de datos.

const Sequelize = require("sequelize");
const { Umzug, SequelizeStorage } = require('umzug')

const { DATABASE_URL } = require("./config");

// DATABASE_URL (EXTERNAL_DATABASE_URL de Render).
const sequelize = new Sequelize(DATABASE_URL, {
  // Render requiere de conexiones SSL, por eso se le agrega el objeto "dialectOptions".
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Código que brinda la teoría, copiado desde GitHub (rama part13-7).
const migrationConf = {
  migrations: {
    glob: "migrations/*.js",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const conectarABaseDeDatos = async () => {
  try {
    // La función de "sequelize.authenticate()" es verificar si Sequelize puede conectarse a la bd con las credenciales que se le proporcionaron.
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida con éxito.");
    await runMigrations();
  } catch (error) {
    console.error("No se pudo conectar a la base de datos: ", error);
    // Se detiene la app si no hay conexión.
    return process.exit(1);
  }
  return null;
};

module.exports = { conectarABaseDeDatos, sequelize };
