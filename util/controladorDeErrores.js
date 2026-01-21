const controladorDeErrores = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "SequelizeValidationError") {
    return response.status(400).json({ error: error.message });
  }

  if (error.name === "SequelizeDatabaseError") {
    return response.status(400).json({ error: "Error de base de datos" });
  }

  next(error);
};

module.exports = controladorDeErrores;
