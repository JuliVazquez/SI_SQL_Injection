import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener los clientes', error);
    }
  };

  return (
    <div>
      <h1>Listado de Clientes</h1>
      <Link to="/home">Volver</Link> {/* Agrega el enlace para volver atrás */}
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Apellido</th>
            {/* Otros campos de la tabla */}
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.usuario}>
              <td>{cliente.usuario}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              {/* Renderizar otros campos de la tabla */}
              <td>
                <Link to={`/perfil/${cliente.usuario}`}>Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clientes;
