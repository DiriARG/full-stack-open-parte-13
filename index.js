// Archivo que configura e inicia la aplicación.

const express = require("express");
const app = express();

const { PORT } = require("./util/config");
const { conectarABaseDeDatos } = require("./util/db");
const blogsRouter = require("./controllers/blogs");
const controladorDeErrores = require("./util/controladorDeErrores");
const usuariosRouter = require("./controllers/usuarios");
const loginRouter = require("./controllers/login")

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usuariosRouter);
app.use("/api/login", loginRouter)

app.use(controladorDeErrores);

const iniciarServidor = async () => {
  await conectarABaseDeDatos();
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en: http://localhost:${PORT}`);
  });
};

iniciarServidor();
