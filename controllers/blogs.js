// Archivo que contiene el manejo de rutas asociado con los blogs.

const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const { Blog, Usuario } = require("../models");
const { SECRET } = require("../util/config");

// Listar todos los blogs.
router.get("/", async (req, res) => {
  const filtros = {};

  // Si existe el parámetro "search" en la URL (?search=...).
  if (req.query.search) {
    // Se usa [Op.or] para buscar coincidencias tanto en en el título como en el autor (resultado válido si al menos una de las opciones se cumple).
    filtros[Op.or] = [
      {
        title: {
          /* [Op.iLike] busca coincidencias sin distinguir entre mayúsculas/minúsculas. 
          El formato %{req.query.search}% hace que busque la palabra en cualquier posición del título. */
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
    ];
  }

  const blogs = await Blog.findAll({
    // Se excluye el campo "usuarioId".
    attributes: { exclude: ["usuarioId"] },
    // Se incluye el campo "name" y "username" de cada usuario.
    include: {
      model: Usuario,
      attributes: ["name", "username"],
    },
    // La opción "where" se utiliza para filtrar la consulta. Si "filtros" está vacio {}, Sequelize ignora el filtrado y retorna todos los registros.
    where: filtros,
  });
  res.json(blogs);
});

// Middleware copiado de la teoría: Inserción correcta de notas.
const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      res.status(401).json({ error: "token invalid" });
    }
  } else {
    res.status(401).json({ error: "token missing" });
  }
  next();
};

// Adicionar un nuevo blog.
router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    // Busca en la base de datos al usuario cuyo ID coincide con el extraído del token.
    const usuario = await Usuario.findByPk(req.decodedToken.id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Crea el nuevo blog uniendo los datos recibidos en el body con el ID del usuario que hace la petición.
    const blog = await Blog.create({ ...req.body, usuarioId: usuario.id });
    return res.json(blog);
  } catch (error) {
    next(error);
  }
});

// Eliminar un blog.
router.delete("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog no encontrado" });
    }

    // Verificación si el usuario del token es el mismo que creó el blog.
    if (blog.usuarioId !== req.decodedToken.id) {
      return res.status(403).json({
        error: "Solo el creador puede eliminar el blog",
      });
    }

    await blog.destroy();

    return res.json({
      mensaje: "Blog eliminado",
      // Se muestra el blog eliminado.
      blog,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { likes } = req.body;
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog no encontrado" });
    }

    // Se actualiza solo el campo "likes" con el valor que viene en el body.
    blog.likes = likes;
    await blog.save();

    res.json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
