const router = require("express").Router();

const { ListaLectura } = require("../models");
const tokenExtractor = require("../util/tokenExtractor");

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

// Marcar blog como leído.
router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const lectura = await ListaLectura.findByPk(req.params.id);

    if (!lectura) {
      return res.status(404).json({ error: "Entrada no encontrada" });
    }

    if (lectura.usuarioId !== req.decodedToken.id) {
      return res.status(403).json({
        error: "No tiene permiso para modificar esta lectura",
      });
    }

    // Se actualiza el campo "leido" con lo que envía el usuario en la petición (read), ya sea true o false.
    lectura.leido = req.body.read;
    await lectura.save();

    res.json(lectura);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
