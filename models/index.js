// Archivo que elimina la necesidad de importar archivos que definan modoles individuales en el resto de la aplicación.

const Blog = require("./blog");

// Sincroniza el modelo con la bd (si la tabla ya existe no hace nada).
Blog.sync();

module.exports = {
  Blog,
};
