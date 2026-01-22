const router = require("express").Router();
/* Se importa sequelize para acceder a:
sequelize.fn: Permite ejecutar funciones agregadas de SQL que existen dentro de la bd (COUNT, SUM, AVG). 
sequelize.col: Sirve para indicarle la columna de la bd a la que se aplican dichas funciones. 
EJ: sequelize.fn("SUM", sequelize.col("likes"))
En este caso, aplicamos la función SUM para que sume los valores de la columna "likes" */
const { sequelize } = require("../util/db");
const { Blog } = require('../models');

router.get("/", async (req, res) => {
  const autores = await Blog.findAll({
    attributes: [
      // Campo que devolverá la consulta.
      "author",
      // Cantidad de blogs por autor, se le asigna el alias "articles".
      [
        sequelize.fn("COUNT", sequelize.col("id")),
        "articles",
      ],
      [
        sequelize.fn("SUM", sequelize.col("likes")),
        "likes",
      ],
    ],
    // Se agrupan los resultados por autor para que las funciones COUNT Y SUM se ejecuten por cada nombre distinto.
    group: ["author"],
    order: [
      [sequelize.fn("SUM", sequelize.col("likes")), "DESC"],
    ],
  });

  res.json(autores);
});

module.exports = router;
