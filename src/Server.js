const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const debug = require('debug')('app:server');

const app = express();
app.use(express.json());
app.use(cors());


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'timbeta',
  password: 'A77aque99.',
  port: 5432, // El puerto por defecto de PostgreSQL es 5432
});

app.post('/usuarios', async (req, res) => {
  const { usuario, password } = req.body;
    console.log('user:'+usuario+' pass: '+password)
    const query = `SELECT * FROM usuario WHERE usuario = '${usuario}' AND password = '${password}';`
    console.log(query)
    try {
      const { rows } = await pool.query(query);
      if (rows.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      } else {
        return res.json({ message: 'Autenticación exitosa' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener el usuario' });
    }

});




const port = 3001;
app.listen(port, () => {
  console.log(`Servidor backend en funcionamiento en http://localhost:${port}`);
});
