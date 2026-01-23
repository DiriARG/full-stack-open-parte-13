// Archivo que elimina la necesidad de importar archivos que definan modoles individuales en el resto de la aplicación.

const Blog = require("./blog");
const Usuario = require("./usuario");
const ListaLectura = require("./listaLectura");

// Un usuario puede tener muchos blogs.
Usuario.hasMany(Blog);
// Al definir que un blog pertenece a un usuario, Sequelize crea automáticamente la columna "usuarioId" (Clave Foránea) en la tabla de blogs.
Blog.belongsTo(Usuario);

// Un usuario tiene muchos blogss en su lista a tráves de "ListaLectura". 
Usuario.belongsToMany(Blog, { through: ListaLectura, as: "lecturas" });
// Un blog puede estar en muchas listas de lectura a través de "ListaLectura".
Blog.belongsToMany(Usuario, { through: ListaLectura, as: "usuarios_lectura" });

module.exports = {
  Blog,
  Usuario,
  ListaLectura
};
