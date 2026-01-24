const router = require("express").Router();
const { Sesion } = require("../models");
const tokenExtractor = require("../util/tokenExtractor");

// Cerrar sesión en el servidor.
router.delete("/", tokenExtractor, async (req, res) => {
  /* IMPORTANTE: Antes de que este código se ejecute, Express pasa la request por el middleware tokenExtractor.
  Si: 
  - El token no existe.
  - El token es inválido.
  - La sesión no existe.
  - El usuario está deshabilitado.
  No se prosigue con la ejecución del código. */
  
  // Extracción del token del encabezado de autorización para identificar qué sesión borrar.
  const token = req.get("authorization").substring(7);

  // Eliminación en el registro de la tabla "sesiones", invalidando el token inmediatamente, aunque el JWT todavía no haya expirado.
  await Sesion.destroy({
    where: { token },
  });

  res.status(204).end();
});

module.exports = router;
