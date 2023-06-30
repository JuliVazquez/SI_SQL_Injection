import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Bienvenido al Home</h1>
      <Link to="/">
      <button>Log Out</button>
      </Link> 
      
      <Link to="/clientes">
        <button>Clientes</button>
      </Link>
      <Link to="/Search"> 
        <button>Buscar</button>
      </Link>
    </div>
  );
}

export default Home;
