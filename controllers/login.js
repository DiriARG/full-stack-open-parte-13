const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const Usuario = require("../models/usuario");

// Inicio de sesión.
router.post("/", async (request, response) => {
  const { username, password } = request.body;

  const usuario = await Usuario.findOne({
    where: {
      username: username,
    },
  });

  const contraseñaCorrecta = password === "secret";

  if (!(usuario && contraseñaCorrecta)) {
    return response.status(401).json({
      error: "Nombre de usuario o contraseña no válidos",
    });
  }

  const datosParaToken = {
    username: usuario.username,
    id: usuario.id,
  };

  const token = jwt.sign(datosParaToken, SECRET);

  response
    .status(200)
    .send({ token, username: usuario.username, name: usuario.name });
});

module.exports = router;
