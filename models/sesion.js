const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../util/db")

class Sesion extends Model {}

Sesion.init(
  /* -Agregar el campo "id" es opcional, ya que Sequelize, por defecto, asume que todo tabla tiene una clave primaria llamada "id" que es un entero autoincremental. 
  - El campo "usuarioId" (Clave foránea), no es necesario agregarlo ya que Sequelize lo inyectará automaticamente en este modelo por la relacion definida en models/index.js: Sesion.belongsTo(Usuario). */
  {
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "sesion",
    /* Sequelize pluraliza automáticamente el "modelName" al inglés (ej: "sesion" --> "sesions").
    Al definir tableName, se evita errores como "SequelizeDatabaseError: relation 'sesions' does not exist", forzando el uso de la tabla "sesiones" definida en la migración. */
    tableName: "sesiones"
  }
)

module.exports = Sesion
