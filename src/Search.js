import React from 'react'
import { useState } from 'react';
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
          <h2>Buscador de Usuarios</h2>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ingrese el nombre de usuario"
          />
          <button onClick={handleSearch}>Buscar</button>
    
          <div>
            <h3>Resultados de la búsqueda:</h3>
            {results.map((usuario) => (
              <div key={usuario.id}>
                <p>Nombre de usuario: {usuario.usuario}</p>
                <p>Nombre: {usuario.nombre}</p>
                <p>Apellido: {usuario.apellido}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      );
    }
export default Search