import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { evaluatePrivileges } from './privileges'; // Ruta al archivo de privilegios

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user);
  }, []);

  const isAdmin = evaluatePrivileges(loggedInUser);

  return (
    <div>
      <h1>Bienvenido al Home</h1>
      <p>Usuario: {loggedInUser}</p>
      <Link to="/">
        <button>Log Out</button>
      </Link>

      {isAdmin ? (
        <Link to="/clientes">
          <button>Clientes</button>
        </Link>
      ) : (
        <Link to="/Search">
          <button>Buscar</button>
        </Link>
      )}
    </div>
  );
}

export default Home;
