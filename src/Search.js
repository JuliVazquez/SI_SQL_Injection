import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../src/css/Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/buscar?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error al realizar la búsqueda', error);
    }
  };

  useEffect(() => {
    if (results.length === 0) {
      setQuery(''); // Limpiar el valor del query
    }
  }, [results]);

  return (
    <div>
      <h1>Buscador de Usuarios</h1>
      <Link to="/home">Volver</Link>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          placeholder="Ingrese el nombre de usuario"
        />
        <button onClick={handleSearch} className="search-button">
          Buscar
        </button>
      </div>
      <div>
        <h3>Resultados de la búsqueda:</h3>
        {results.length > 0 ? (
          results.map((usuario) => (
            <div key={usuario.id}>
              <p>Nombre de usuario: {usuario.usuario}</p>
              <p>Nombre: {usuario.nombre}</p>
              <button>Solicitar amistad</button>
              <hr />
            </div>
          ))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
