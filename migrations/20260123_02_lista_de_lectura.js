const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("lista_lecturas", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // "references" crea la llave foránea en la db.
        references: { model: "usuarios", key: "id" },
        // Asegura que si se borra el usuario, desaparezcan automáticamente sus registros en la lista de lectura.
        onDelete: "CASCADE",
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "blogs", key: "id" },
        onDelete: "CASCADE",
      },
      leido: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
    /* Esta restricción (Constraint) evita que un mismo usuario agregue el mismo blog más de una vez a su lista. */
    await queryInterface.addConstraint("lista_lecturas", {
      fields: ["usuario_id", "blog_id"],
      type: "unique",
      name: "restriccion_unico_usuario_blog_lista",
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("lista_lecturas");
  },
};
