const controladorDeErrores = (error, request, response, next) => {
  console.error(error.message);

  // Errores de validación (ej: campo vacío).
  if (error.name === "SequelizeValidationError") {
    // Se entra al array "errors" (de SequelizeValidationError) del objeto "error" para extraer el mensaje. 
    return response.status(400).json({
      error: error.errors.map(e => e.message),
    });
  } 
  // Errores de duplicados.
  else if (error.name === "SequelizeUniqueConstraintError") {
    return response.status(400).json({ error: "El nombre de usuario ya existe" });
  } else if (error.name === "SequelizeDatabaseError") {
    return response.status(400).json({ error: "Error de base de datos" });
  }

  next(error);
};

module.exports = controladorDeErrores;
