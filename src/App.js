import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './views/Login/Login';
import { Dashboard } from './components/Dashboard/Dashboard'
import Usuarios from './components/Dashboard/Usuarios/Usuarios';
import Libros from './components/Dashboard/Libros/Libros';
import Reservar from './components/Dashboard/Reservar/Reservar';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='usuarios' element={<Usuarios />} />
          <Route path='libros' element={<Libros />} />
          <Route path='reservar' element={<Reservar />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;