import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Clientes from './Clientes';
import Perfil from './Perfil';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/perfil/:usuario" element={<Perfil />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
