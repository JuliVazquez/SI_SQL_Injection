const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

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
    const query = `SELECT * FROM sys_user WHERE usuario = '${usuario}' AND password = '${password}';`
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

app.get('/clientes', async (req, res) => {
  try {
    const query = 'SELECT * FROM cliente;';
    const { rows } = await pool.query(query);
    return res.json(rows);
  } catch (error) {
    console.error('Error al obtener los clientes', error);
    return res.status(500).json({ error: 'Error al obtener los clientes' });
  }
});

app.get('/clientes/:usuario', async (req, res) => {
  const usuario = req.params.usuario;

  try {
    const query = 'SELECT * FROM cliente WHERE usuario = $1;';
    const { rows } = await pool.query(query, [usuario]);

    if (rows.length > 0) {
      const cliente = rows[0];
      res.json(cliente);
    } else {
      res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el cliente', error);
    res.status(500).json({ error: 'Error al obtener el cliente' });
  }
});

app.put('/clientes/:usuario', async (req, res) => {
  const usuario = req.params.usuario;
  const editedCliente = req.body;

  try {
    const query = `UPDATE cliente SET
      nombre = $1,
      apellido = $2,
      pais = $3,
      provincia = $4,
      ciudad = $5,
      calle = $6,
      altura = $7,
      departamento = $8,
      telefono = $9,
      dni = $10,
      cuit = $11,
      email = $12,
      cbu = $13
      WHERE usuario = $14;`;

    const values = [
      editedCliente.nombre,
      editedCliente.apellido,
      editedCliente.pais,
      editedCliente.provincia,
      editedCliente.ciudad,
      editedCliente.calle,
      editedCliente.altura,
      editedCliente.departamento,
      editedCliente.telefono,
      editedCliente.dni,
      editedCliente.cuit,
      editedCliente.email,
      editedCliente.cbu,
      usuario
    ];

    await pool.query(query, values);

    res.json({ message: 'Cliente actualizado' });
  } catch (error) {
    console.error('Error al actualizar el cliente', error);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
});


app.put('/clientes/:usuario', async (req, res) => {
  const usuario = req.params.usuario;
  const editedCliente = req.body;

  try {
    const query = `UPDATE cliente SET
      nombre = $1,
      apellido = $2,
      pais = $3,
      provincia = $4,
      ciudad = $5,
      calle = $6,
      altura = $7,
      departamento = $8,
      telefono = $9,
      dni = $10,
      cuit = $11,
      email = $12,
      cbu = $13
      WHERE usuario = $14;`;

    const values = [
      editedCliente.nombre,
      editedCliente.apellido,
      editedCliente.pais,
      editedCliente.provincia,
      editedCliente.ciudad,
      editedCliente.calle,
      editedCliente.altura,
      editedCliente.departamento,
      editedCliente.telefono,
      editedCliente.dni,
      editedCliente.cuit,
      editedCliente.email,
      editedCliente.cbu,
      usuario
    ];
    console.log(query)
    await pool.query(query, values);

    res.json({ message: 'Cliente actualizado' });
  } catch (error) {
    console.error('Error al actualizar el cliente', error);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
});


const port = 3001;
app.listen(port, () => {
  console.log(`Servidor backend en funcionamiento en http://localhost:${port}`);
});
