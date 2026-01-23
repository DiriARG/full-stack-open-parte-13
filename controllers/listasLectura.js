const router = require("express").Router();
const { ListaLectura } = require("../models");

router.post("/", async (req, res, next) => {
  try {
    const { blogId, usuarioId } = req.body;

    const lectura = await ListaLectura.create({
      blogId,
      usuarioId,
    });

    res.status(201).json(lectura);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
