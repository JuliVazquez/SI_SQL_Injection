import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    
      return (
        <div>
          <h1>Buscador de Usuarios</h1>
          <Link to="/home">Volver</Link>
          <div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ingrese el nombre de usuario"
            />
            <button onClick={handleSearch}>Buscar</button>
          </div>
          <div>
            <h3>Resultados de la búsqueda:</h3>
            {results.map((usuario) => (
              <div key={usuario.id}>
                <p>Nombre de usuario: {usuario.usuario}</p>
                <p>Nombre: {usuario.nombre}</p>
                <p>Apellido: {usuario.apellido}</p>
                <button>Solicitar amistad</button>
                <hr />
              </div>
            ))}
          </div>
        </div>
      );
    }
export default Search