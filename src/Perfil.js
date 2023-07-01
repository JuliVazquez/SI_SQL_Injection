import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../src/css/Perfil.css';

function Perfil() {
  const { usuario } = useParams();
  const [cliente, setCliente] = useState(null);
  const [cuenta, setCuenta] = useState(null);
  const [editedCliente, setEditedCliente] = useState(null);
  const [retiro, setRetiro] = useState('');
  const [acreditacion, setAcreditacion] = useState('');
  const [amigos, setAmigos] = useState([]);

  useEffect(() => {
    fetchCliente();
    fetchAmigos();
  }, [usuario]);

  const fetchCliente = async () => {
    try {
      const clienteResponse = await axios.get(`http://localhost:3001/clientes/${usuario}`);
      const cuentaResponse = await axios.get(`http://localhost:3001/cuentas/${usuario}`);
  
      setCliente(clienteResponse.data);
      setEditedCliente(clienteResponse.data);
      setCuenta(cuentaResponse.data);
    } catch (error) {
      console.error('Error al obtener el cliente y la cuenta', error);
    }
  };
  
  const fetchAmigos = async () => {
    try {
      const amigosResponse = await axios.get(`http://localhost:3001/amigos/${usuario}`);
      setAmigos(amigosResponse.data); // Corrección aquí
      console.log(amigosResponse.data);
    } catch (error) {
      console.error('Error al obtener los amigos', error);
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
     alert('Cliente actualizado:');
    } catch (error) {
      console.error('Error al actualizar el cliente', error);
    }
  };

  const handleRetiro = () => {
    const saldoActual = cuenta.saldo;
    const retiroAmount = parseFloat(retiro);
  
    if (retiroAmount <= saldoActual) {
      const saldoActualizado = saldoActual - retiroAmount;
      const fecha = new Date().toLocaleDateString();
  
      alert(`Se ha cargado una orden de transferencia:
      CBU: ${cliente.cbu}
      IMPORTE: ${retiroAmount.toString()}
      FECHA: ${fecha}`);
  
      setCuenta({
        ...cuenta,
        saldo: saldoActualizado
      });
    } else {
      alert('No tienes suficiente saldo para retirar esa cantidad');
    }
  
    setRetiro('');
  };
  
  const handleAcreditacion = () => {
    const saldoActual = cuenta.saldo;
    const acreditacionAmount = parseFloat(acreditacion);
  
    const saldoActualizado = saldoActual + acreditacionAmount;
    setCuenta({
      ...cuenta,
      saldo: saldoActualizado.toString()
    });
  };

  return (
    <div className="perfil-container">
      <h1>Perfil del Cliente</h1>
      <Link to="/clientes">Volver</Link>

      {cliente ? (
        <div className="perfil-info">
          <form className="perfil-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="usuario">Usuario:</label>
              <input type="text" name="usuario" id="usuario" value={editedCliente.usuario} onChange={handleInputChange} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" name="nombre" id="nombre" value={editedCliente.nombre} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido:</label>
              <input type="text" name="apellido" id="apellido" value={editedCliente.apellido} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="pais">País:</label>
              <input type="text" name="pais" id="pais" value={editedCliente.pais} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="provincia">Provincia:</label>
              <input type="text" name="provincia" id="provincia" value={editedCliente.provincia} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="ciudad">Ciudad:</label>
              <input type="text" name="ciudad" id="ciudad" value={editedCliente.ciudad} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="calle">Calle:</label>
              <input type="text" name="calle" id="calle" value={editedCliente.calle} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="altura">Altura:</label>
              <input type="number" name="altura" id="altura" value={editedCliente.altura} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="departamento">Departamento:</label>
              <input type="text" name="departamento" id="departamento" value={editedCliente.departamento} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Teléfono:</label>
              <input type="text" name="telefono" id="telefono" value={editedCliente.telefono} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="dni">DNI:</label>
              <input type="text" name="dni" id="dni" value={editedCliente.dni} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="cuit">CUIT:</label>
              <input type="text" name="cuit" id="cuit" value={editedCliente.cuit} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" id="email" value={editedCliente.email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="cbu">CBU:</label>
              <input type="text" name="cbu" id="cbu" value={editedCliente.cbu} onChange={handleInputChange} />
            </div>
            <button type="submit" className="home-button">Guardar</button>
          </form>
        </div>
      ) : (
        <p>Cargando cliente...</p>
      )}

      {cuenta ? (
        <div className="cuenta-container">
          <h2>Información de la cuenta</h2>
          <div className="cuenta-details">
            <p>Número de cuenta: {cuenta.nrocuenta}</p>
            <div className="saldo-container">
              <p className="saldo-label">Saldo:</p>
              <p className="saldo-value">{cuenta.saldo}</p>
            </div>
          </div>
          <div className="operaciones-container">
            <h3>Operaciones</h3>
            <div className="operaciones-details">
              <div className="operacion-item">
                <label htmlFor="retiro">Retirar:</label>
                <input type="number" name="retiro" id="retiro" value={retiro} onChange={(e) => setRetiro(e.target.value)} />
                <button type="button" className="operacion-button" onClick={handleRetiro}>Retirar</button>
              </div>
              <div className="operacion-item">
                <label htmlFor="acreditacion">Acreditar:</label>
                <input type="number" name="acreditacion" id="acreditacion" value={acreditacion} onChange={(e) => setAcreditacion(e.target.value)} />
                <button type="button" className="operacion-button" onClick={handleAcreditacion}>Acreditar</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando cuenta...</p>
      )}

      {amigos && amigos.length > 0 && (
        <div className="amigos-container">
          <h2>Amigos</h2>
          <ul className="amigos-list">
            {amigos.map((amigo) => (
              <li key={amigo.usuario2}>{amigo.usuario2}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Perfil;
