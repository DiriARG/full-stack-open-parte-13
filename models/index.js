// Archivo que elimina la necesidad de importar archivos que definan modoles individuales en el resto de la aplicación.

const Blog = require("./blog");
const Usuario = require("./usuario");

// Un usuario puede tener muchos blogs.
Usuario.hasMany(Blog)
// Al definir que un blog pertenece a un usuario, Sequelize crea automáticamente la columna "usuarioId" (Clave Foránea) en la tabla de blogs.
Blog.belongsTo(Usuario)

/* sync: sincroniza el modelo con la bd (si la tabla ya existe no hace nada).
alter: true: Verifica cuál es el estado actual de la tabla en la bd (qué columnas tiene, tipos de datos, etc.) y luego realiza los cambios necesarios en la tabla para que coincida con el modelo. */ 
Blog.sync({alter: true});
Usuario.sync({alter: true});

module.exports = {
  Blog,
  Usuario,
};
