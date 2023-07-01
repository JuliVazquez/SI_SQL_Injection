import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/usuarios', {
        usuario: usuario,
        password: password
      });
  
      if (response.status === 200 && response.data.message === 'Autenticación exitosa') {
         console.log('Autenticación exitosa');
         localStorage.setItem('loggedInUser', usuario); 
         navigate('/home');
      } else {
        setError(null); // Reiniciar el estado de error
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Usuario o contraseña incorrectos');
      } else {
        console.error('Error al realizar la solicitud', error);
        setError('Error al iniciar sesión');
      }
    }
  };
  
  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="usuario" className="form-label">usuario:</label>
          <input
            type="usuario"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Contraseña:</label>
          <input
            // type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;
