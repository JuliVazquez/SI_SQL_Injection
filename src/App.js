
import Login from './Login';
import Perfil from './Perfil';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
