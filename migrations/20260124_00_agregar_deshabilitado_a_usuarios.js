const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("usuarios", "deshabilitado", {
      type: DataTypes.BOOLEAN,
      // Por defecto los usuarios no estan deshabilitados.
      defaultValue: false,
    })
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("usuarios", "deshabilitado")
  },
}
