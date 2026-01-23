const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    // Se agrega la columna "year" a la tabla "blogs".
    await queryInterface.addColumn("blogs", "year", {
      type: DataTypes.INTEGER,
      allowNull: false,
    });
  },

  down: async ({ context: queryInterface }) => {
    // Para deshacer, simplemente se quita dicha columna.
    await queryInterface.removeColumn("blogs", "year");
  },
};
