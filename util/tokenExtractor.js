const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const { Sesion, Usuario } = require("../models");

// Middleware copiado de la teoría: Inserción correcta de notas (Modificado para cumplir el ejercicio 13.24).
const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization")

  // Verificación de integridad del protocolo: El encabezado debe existir y seguir el esquema Bearer.
  if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "token missing" })
  }

  const token = authorization.substring(7)

  try {
    // Validación criptográfica: Se verifica que el token fue firmado por el servidor y no ha expirado.
    const decoded = jwt.verify(token, SECRET)

    // Validación de estado: Se consulta a la base de datos para asegurar que la sesión no haya sido revocada (logout) y se obtienen los datos del usuario en una sola operación.
    const sesion = await Sesion.findOne({
      where: { token },
      include: Usuario,
    })

    if (!sesion) {
      return res.status(401).json({ error: "Sesión inválida o expirada (debe iniciar sesión nuevamente)" })
    }

    // Si el usuario fue deshabilitado...
    if (sesion.usuario.deshabilitado) {
      return res.status(403).json({ error: "Acceso denegado: cuenta deshabilitada" })
    }

    // Se guarda el token decodificado y el objeto usuario para que los controladores no necesiten realizar más búsquedas en la bd.
    req.decodedToken = decoded
    req.usuario = sesion.usuario

    next()
  } catch (error) {
    return res.status(401).json({ error: "token invalid" })
  }
}

module.exports = tokenExtractor;
