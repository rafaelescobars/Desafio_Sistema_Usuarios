const {
  Pool
} = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "qwer1234",
  database: "softlife",
  port: 5432
})

const generarQuery = (name, text, values) => {
  return {
    name,
    text,
    values
  }
}

const insertar = async (datos) => {

  const name = "insertar"
  const text = "INSERT INTO usuarios (email, password) values($1, $2)"
  const values = datos

  try {
    const result = await pool.query(generarQuery(name, text, values))
    return result
  } catch (error) {
    console.log(error.code)
    return error
  }
}

const consultar = async () => {

  const name = "consultar"
  const text = "SELECT * FROM usuarios"
  const values = []

  try {
    const result = await pool.query(generarQuery(name, text, values))
    return result
  } catch (error) {
    console.log(error.code)
    return error
  }
}

const login = async (datos) => {

  const name = "login"
  const text = "SELECT * FROM usuarios WHERE email = $1 AND password = $2"
  const values = datos

  try {
    const result = await pool.query(generarQuery(name, text, values))

    return result

  } catch (error) {
    console.log(error.code)
    return error
  }
}

module.exports = {
  insertar,
  consultar,
  login
}