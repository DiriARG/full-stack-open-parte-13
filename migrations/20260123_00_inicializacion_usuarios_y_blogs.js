const { DataTypes } = require("sequelize");

module.exports = {
  /* La función "up" define los cambios que se aplicarán a la bd cuando se ejecute la migración (crear tablas, columnas, etc.).
  "queryInterface" es el objeto que permite interactuar con la bd a bajo nivel, osea dándole órdenes directas y manuales a la base de datos. */
  up: async ({ context: queryInterface }) => {
    // Creación tabla de usuarios.
    await queryInterface.createTable("usuarios", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      // Marcas de tiempo.
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    // Creación tabla de blogs.
    await queryInterface.createTable("blogs", {
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
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    /* La columna "usuario_id" es la representación de la relación: Blog.belongsTo(Usuario). 
    El campo "references" establece la clave foránea en la base de datos. */
    await queryInterface.addColumn("blogs", "usuario_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "usuarios", key: "id" },
    });
  },

  /* La función "down" define cómo deshacer los cambios realizados en "up". */
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("blogs");
    await queryInterface.dropTable("usuarios");
  },
};
