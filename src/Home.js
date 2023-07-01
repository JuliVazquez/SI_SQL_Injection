import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { evaluatePrivileges } from './privileges';
import '../src/css/Home.css';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user);
  }, []);

  const isAdmin = evaluatePrivileges(loggedInUser);

  return (
    <div className="home-container">
      <h1 className="home-title">TIMBETA</h1>
      <h1 className="login-subtitle">bets &amp; friends</h1>
      <h2 className="home-welcome">Bienvenido {loggedInUser}</h2>

      <Link to="/" className="logout-link">
        <button className="home-button">Log Out</button>
      </Link>

      {!isAdmin && (
        <>
          <Link to={`/perfil/${loggedInUser}`} className="home-link">
            <button className="home-button">Mi Perfil</button>
          </Link>

          <Link to="/search" className="home-link">
            <button className="home-button">Buscar Amigos</button>
          </Link>

          <Link to="/apostar" className="home-link">
            <button className="home-button">Apostar</button>
          </Link>

          <button className="home-button">Soporte</button>
        </>
      )}

      {isAdmin && (
        <>
          <Link to="/clientes" className="home-link">
            <button className="home-button">Clientes</button>
          </Link>

          <Link to="/crear-apuestas" className="home-link">
            <button className="home-button">Crear Apuestas</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Home;
