import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Perfil() {
  const { usuario } = useParams();
  const [cliente, setCliente] = useState(null);
  const [editedCliente, setEditedCliente] = useState(null);

  useEffect(() => {
    fetchCliente();
  }, [usuario]);

  const fetchCliente = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/clientes/${usuario}`);
      setCliente(response.data);
      setEditedCliente(response.data);
    } catch (error) {
      console.error('Error al obtener el cliente', error);
    }
  };

  const handleInputChange = (e) => {
    setEditedCliente({
      ...editedCliente,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/clientes/${usuario}`, editedCliente);
      setCliente(editedCliente);
      console.log('Cliente actualizado:', editedCliente);
    } catch (error) {
      console.error('Error al actualizar el cliente', error);
    }
  };

  return (
    <div>
      <h1>Perfil del Cliente</h1>
        <Link to="/clientes">Volver</Link> {/* Agrega el enlace para volver atrás */}
        {cliente ? (
            <div>
            <form onSubmit={handleSubmit}>
                <p>
                Usuario: <input type="text" name="usuario" value={editedCliente.usuario} onChange={handleInputChange} />
                </p>
                <p>
                Nombre: <input type="text" name="nombre" value={editedCliente.nombre} onChange={handleInputChange} />
                </p>
                <p>
                Apellido: <input type="text" name="apellido" value={editedCliente.apellido} onChange={handleInputChange} />
                </p>
                <p>
                País: <input type="text" name="pais" value={editedCliente.pais} onChange={handleInputChange} />
                </p>
                <p>
                Provincia: <input type="text" name="provincia" value={editedCliente.provincia} onChange={handleInputChange} />
                </p>
                <p>
                Ciudad: <input type="text" name="ciudad" value={editedCliente.ciudad} onChange={handleInputChange} />
                </p>
                <p>
                Calle: <input type="text" name="calle" value={editedCliente.calle} onChange={handleInputChange} />
                </p>
                <p>
                Altura: <input type="number" name="altura" value={editedCliente.altura} onChange={handleInputChange} />
                </p>
                <p>
                Departamento: <input type="text" name="departamento" value={editedCliente.departamento} onChange={handleInputChange} />
                </p>
                <p>
                Teléfono: <input type="text" name="telefono" value={editedCliente.telefono} onChange={handleInputChange} />
                </p>
                <p>
                DNI: <input type="text" name="dni" value={editedCliente.dni} onChange={handleInputChange} />
                </p>
                <p>
                CUIT: <input type="text" name="cuit" value={editedCliente.cuit} onChange={handleInputChange} />
                </p>
                <p>
                Email: <input type="text" name="email" value={editedCliente.email} onChange={handleInputChange} />
                </p>
                <p>
                CBU: <input type="text" name="cbu" value={editedCliente.cbu} onChange={handleInputChange} />
                </p>
                {/* Agregar más campos editables del cliente */}
                <button type="submit">Guardar</button>
            </form>
            </div>
        ) : (
            <p>Cargando cliente...</p>
        )}
    </div>
  );
}

export default Perfil;
