require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");
const app = express();

// DATABASE_URL (EXTERNAL_DATABASE_URL de Render).
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  // Render requiere de conexiones SSL, por eso se le agrega el objeto "dialectOptions".
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Sintaxis moderna de JS (ES6) para definir modelos en Sequelize.
class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    // Como en JS se utiliza camelCase y en Postgres se utiliza snake_case, "underscored:true" le dice a Sequelize que haga esa traducción automáticamente para que la bd siga las convenciones correctas sin tener que cambiar la forma de escribir código en JS.
    underscored: true,
    // Falso porque no utilizamos las marcas de tiempo (created_at y updated_at) al crear la tabla (Ejercicio 13.2).
    timestamps: false,
    modelName: "blog",
  },
);

// Sincroniza el modelo con la bd (si la tabla ya existe no hace nada).
Blog.sync();

app.use(express.json());

// Listar todos los blogs.
app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

// Adicionar un nuevo blog.
app.post("/api/blogs", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Eliminar un blog.
app.delete("/api/blogs/:id", async (req, res) => {
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

const PORT = process.env.PORT || 3001;

const iniciarServidor = async () => {
  try {
    // La función de "sequelize.authenticate()" es verificar si Sequelize puede conectarse a la bd con las credenciales que se le proporcionaron.
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida con éxito.");
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
    // Se detiene la app si no hay conexión.
    return process.exit(1);
  }
};

iniciarServidor();
