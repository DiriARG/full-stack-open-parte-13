// Archivo que elimina la necesidad de importar archivos que definan modoles individuales en el resto de la aplicación.

const Blog = require("./blog");
const Usuario = require("./usuario");

// Un usuario puede tener muchos blogs.
Usuario.hasMany(Blog)
// Al definir que un blog pertenece a un usuario, Sequelize crea automáticamente la columna "usuarioId" (Clave Foránea) en la tabla de blogs.
Blog.belongsTo(Usuario)

module.exports = {
  Blog,
  Usuario,
};
