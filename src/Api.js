const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'timbeta',
  password: 'A77aque99.',
  port: 5432, // Puerto por defecto de PostgreSQL
});


// Función para ejecutar consultas en la base de datos
async function query(text, params) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
}

// Función para verificar las credenciales de inicio de sesión
async function verificarCredenciales(usuario, password) {
  const queryText = 'SELECT * FROM usuario WHERE usuario = $1 AND password = $2';
  const params = [usuario, password];

  try {
    const result = await query(queryText, params);
    console.log(result)
    return result.length > 0; // Devuelve true si las credenciales son válidas
  } catch (error) {
    console.error('Error al verificar las credenciales:', error);
    return false; // Devuelve false en caso de error
  }
}


// Ejecutar una consulta para obtener todos los usuarios
async function obtenerUsuarios() {
  try {
    const usuarios = await query('SELECT * FROM usuario');
    return usuarios;
  } catch (error) {
    throw new Error('Error al obtener los usuarios');
  } finally {
    pool.end(); // Cerrar la conexión a la base de datos cuando hayas terminado
  }
}

module.exports = {
  obtenerUsuarios,
};


module.exports = {
  verificarCredenciales,
};