const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const Usuario = require("../models/usuario");
const Sesion = require("../models/sesion");

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

  // Verificación de integridad: Bloqueo del acceso si el usuario fue marcado como deshabilitado en la bd.
  if (usuario.deshabilitado) {
    return response.status(401).json({
      error: "La cuenta ha sido deshabilitada. Contacte al administrador",
    });
  }

  const datosParaToken = {
    username: usuario.username,
    id: usuario.id,
  };

  const token = jwt.sign(datosParaToken, SECRET);

  /* Registro de sesión activa: Se guarda el token en la bd para validar su vigencia.
  Esto convierte al sistema en una "lista de autorizados": aunque un token sea matemáticamente válido, solo se permitirá el acceso si el registro existe en la tabla de sesiones.
  Esto permite invalidar accesos de forma inmediata eliminando el registro (ej: al cerrar sesión). */
  await Sesion.create({
    token,
    usuarioId: usuario.id,
  });

  response
    .status(200)
    .send({ token, username: usuario.username, name: usuario.name });
});

module.exports = router;
