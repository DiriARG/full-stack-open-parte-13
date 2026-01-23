const router = require("express").Router();

const { Usuario, Blog } = require("../models");

// Listar todos los usuarios.
router.get("/", async (req, res) => {
  const usuarios = await Usuario.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["usuarioId"] },
    },
  });
  res.json(usuarios);
});

// Agregar un nuevo usuario.
router.post("/", async (req, res, next) => {
  try {
    const usuario = await Usuario.create(req.body);
    return res.json(usuario);
  } catch (error) {
    next(error);
  }
});

// Cambiar nombre de usuario.
router.put("/:username", async (req, res, next) => {
  try {
    const usuario = await Usuario.findOne({
      where: { username: req.params.username },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    usuario.username = req.body.username;
    await usuario.save();

    res.json(usuario);
  } catch (error) {
    next(error);
  }
});

// Obtener un usuario y su lista de lectura.
router.get("/:id", async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: ["name", "username"],
      include: {
        model: Blog,
        // El "as" le dice a Sequelize qué relación debe usar (muchos a muchos).
        as: "lecturas",
        attributes: ["id", "url", "title", "author", "likes", "year"],
        through: {
          attributes: ["leido", "id"],
        },
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
