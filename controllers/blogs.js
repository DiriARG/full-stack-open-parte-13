// Archivo que contiene el manejo de rutas asociado con los blogs.

const router = require("express").Router();

const { Blog } = require("../models");

// Listar todos los blogs.
router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

// Adicionar un nuevo blog.
router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Eliminar un blog.
router.delete("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (!blog) {
    return res.status(404).json({ error: "Blog no encontrado" });
  }

  await blog.destroy();

  return res.json({
    mensaje: "Blog eliminado",
    // Se muestra el blog eliminado.
    blog,
  });
});

router.put("/:id", async (req, res) => {
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
    return res.status(400).json({ error: error.message });
  }
});


module.exports = router;