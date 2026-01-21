// Archivo que corresponde al modelo "Blog".

const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

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

module.exports = Blog;
