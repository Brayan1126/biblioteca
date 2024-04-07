import React from 'react';
import Header from './Header/Header';
import { Routes, Route } from 'react-router-dom';
import Usuarios from './Usuarios/Usuarios';
import Libros from './Libros/Libros';
import Reservar from './Reservar/Reservar';

export const Dashboard = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path='usuarios' element={<Usuarios />} />
                <Route path='libros' element={<Libros />} />
                <Route path='reservar' element={<Reservar />} />
            </Routes>
        </div>
    );
};

export default Dashboard;
