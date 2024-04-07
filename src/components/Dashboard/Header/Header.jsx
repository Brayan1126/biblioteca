import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand">Biblioteca</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/dashboard/libros" className="nav-link">Libros</Link>
                        <Link to="/dashboard/usuarios" className="nav-link">Usuarios</Link>
                        <Link to="/dashboard/reservar" className="nav-link">Reservar</Link>
                        <Link to="/" className="nav-link">Cerrar sesión</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
