const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
app.use(express.json());
app.use(cors());
app.use(session({
  secret: 'secreto', // Cambia esto por una cadena secreta más segura
  resave: false,
  saveUninitialized: true
}));

const pool = require('./dbconfig');
const schemas = require('./schemas');
app.use(session({
  secret: 'secreto', // Cambia esto por una cadena secreta más segura
  resave: false,
  saveUninitialized: true
}));

const startServer = () => {
  const port = 3001;
  app.listen(port, () => {
    console.log(`Servidor backend en funcionamiento en http://localhost:${port}`);
  });
};

schemas(pool)
.then(() => {
  console.log('Esquemas creados exitosamente');
  startServer();
})
.catch(error => {
  console.error('Error al crear los esquemas:', error);
});

app.get('/buscar', async (req, res) => {
  const { query } = req.query;
  
  try {
    const searchQuery = `SELECT sys_user.usuario,nombre FROM sys_user LEFT JOIN cliente on sys_user.usuario=cliente.usuario WHERE sys_user.usuario LIKE '%${query}%' and sys_user.usuario<>'admin';`;
    const { rows } = await pool.query(searchQuery);
    
    res.json(rows);
  } catch (error) {
    console.error('Error al buscar usuarios', error);
    res.status(500).json({ error: 'Error al buscar usuarios' });
  }
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
        req.session.loggedInUser = usuario;
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

app.get('/cuentas/:usuario', async (req, res) => {
  const cuenta = req.params.usuario;

  try {
    const query = 'SELECT * FROM cuenta WHERE usuario = $1;';
    const { rows } = await pool.query(query, [cuenta]);

    if (rows.length > 0) {
      const cliente = rows[0];
      res.json(cliente);
    } else {
      res.status(404).json({ mensaje: 'Cuenta no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el cuenta', error);
    res.status(500).json({ error: 'Error al obtener el cuenta' });
  }
});

app.get('/amigos/:usuario', async (req, res) => {
  const usuario = req.params.usuario;
  const query = `SELECT * FROM friendship LEFT JOIN cliente ON WHERE usuario1 = $1;`;
  
  try {
    const { rows } = await pool.query(query, [usuario]);
    return res.json(rows);
  } catch (error) {
    console.error('Error al obtener los amigos del usuario', error);
    res.status(500).json({ error: 'Error al obtener los amigos del usuario' });
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
