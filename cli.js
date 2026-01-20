require('dotenv').config()
const { Sequelize } = require('sequelize')

// Conexión a la base de datos.
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

const imprimirBlogs = async () => {
  try {
    // Con "sequelize.query" permite utilizar SQL directo (consulta "cruda").
    const blogs = await sequelize.query(
      'SELECT * FROM blogs',
      { type: sequelize.QueryTypes.SELECT }
    )

    // Se imprime cada blog con el formato deseado.
    blogs.forEach(blog => {
      console.log(
        `${blog.author}: '${blog.title}', ${blog.likes} likes`
      )
    })

    // Se cierra la conexión para que el script termine de ejecutarse.
    await sequelize.close()
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

imprimirBlogs()
