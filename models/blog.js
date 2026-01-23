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
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        // Validación incorporada de Sequelize para un valor mínimo.
        min: {
          args: 1991,
          msg: "El año debe ser mayor o igual a 1991",
        },
        // Validación personalizada para el valor máximo. Se utiliza una función para que el límte sea dinámico (el año actual).
        max(valor) {
          /* El "new Date()" crea un nuevo objeto de fecha de js que contiene la fecha y hora exacta del momento en que se ejecuta el código.
          El ".getFullYear()" es un método de ese objeto de fecha que extrae únicamente el año en formato de cuatro dígitos (ej: 2026). */
          const añoActual = new Date().getFullYear();
          if (valor > añoActual) {
            throw new Error(`El año no puede ser mayor a ${añoActual}`);
          }
        },
      },
    },
  },
  {
    sequelize,
    // Como en JS se utiliza camelCase y en Postgres se utiliza snake_case, "underscored:true" le dice a Sequelize que haga esa traducción automáticamente para que la bd siga las convenciones correctas sin tener que cambiar la forma de escribir código en JS.
    underscored: true,
    timestamps: true,
    modelName: "blog",
  },
);

module.exports = Blog;
