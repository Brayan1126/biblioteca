import React, { useState, useEffect } from 'react';
import './Reservar.css';

export const Reservar = () => {
    const [reservas, setReservas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [libros, setLibros] = useState([]);
    const [nuevaReserva, setNuevaReserva] = useState({
        usuarioId: '',
        libroId: '',
        fechaEntrega: '',
    });
    const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
        const reservasGuardadas = JSON.parse(localStorage.getItem('reservas'));
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'));
        const librosGuardados = JSON.parse(localStorage.getItem('libros'));

        if (reservasGuardadas) {
            setReservas(reservasGuardadas);
        }

        if (usuariosGuardados) {
            setUsuarios(usuariosGuardados);
        }

        if (librosGuardados) {
            setLibros(librosGuardados);
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNuevaReserva({ ...nuevaReserva, [name]: value });
    };

    const guardarReserva = (event) => {
        event.preventDefault();
        const libroSeleccionado = libros.find(libro => libro.nombre === nuevaReserva.libroId);
        if (libroSeleccionado && libroSeleccionado.disponible !== false ) {
            const reserva = { ...nuevaReserva };
            reserva.fechaEntrega = new Date().toISOString().slice(0, 10);
            const nuevasReservas = [...reservas, reserva];
            setReservas(nuevasReservas);
            localStorage.setItem('reservas', JSON.stringify(nuevasReservas));

            // Actualizar la disponibilidad del libro
            const nuevosLibros = libros.map(libro => {
                if (libro.nombre === nuevaReserva.libroId) {
                    return { ...libro, disponible: false };
                }
                return libro;
            });
            setLibros(nuevosLibros);
            localStorage.setItem('libros', JSON.stringify(nuevosLibros));

            setNuevaReserva({ usuarioId: '', libroId: '' });
            setMostrarModal(false);
        } else {
            alert('El libro seleccionado no está disponible para reserva.');
        }
    };

    const eliminarReserva = (index) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta reserva?");
        if (confirmacion) {
            const reservaEliminada = reservas[index];
            const nuevasReservas = reservas.filter((reserva, i) => i !== index);
            setReservas(nuevasReservas);
            localStorage.setItem('reservas', JSON.stringify(nuevasReservas));

            // Actualizar la disponibilidad del libro al eliminar la reserva
            const libroAsociado = libros.find(libro => libro.id === reservaEliminada.libroId);
            if (libroAsociado) {
                const nuevosLibros = libros.map(libro => {
                    if (libro.id === reservaEliminada.libroId) {
                        return { ...libro, disponible: true };
                    }
                    return libro;
                });
                setLibros(nuevosLibros);
                localStorage.setItem('libros', JSON.stringify(nuevosLibros));
            }
        }
    };

    return (
        <div className='reservarContainer'>
            <button className='buttonAgg' onClick={() => setMostrarModal(true)}>+ Crear Reserva</button>
            {mostrarModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setMostrarModal(false)}>&times;</span>
                        <h3>Crear Reserva</h3>
                        <form onSubmit={guardarReserva}>
                            <label htmlFor="usuarioId">Usuario:</label>
                            <select
                                id="usuarioId"
                                name="usuarioId"
                                value={nuevaReserva.usuarioId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccionar usuario</option>
                                {usuarios.map((usuario) => (
                                    <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                                ))}
                            </select>
                            <label htmlFor="libroId">Libro:</label>
                            <select
                                id="libroId"
                                name="libroId"
                                value={nuevaReserva.libroId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccionar libro</option>
                                {libros.map((libro) => (
                                    <option key={libro.id} value={libro.id}>{libro.nombre}</option>
                                ))}
                            </select>
                            <button type="submit">Crear Reserva</button>
                        </form>
                    </div>
                </div>
            )}
            <h3>Listado de Reservas:</h3>
            <table className="tableReservas">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Libro</th>
                        <th>Fecha de reserva</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva, index) => (
                        <tr key={index}>
                            <td>{reserva.usuarioId}</td>
                            <td>{reserva.libroId}</td>
                            <td>{reserva.fechaEntrega}</td>
                            <td><button onClick={() => eliminarReserva(index)}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reservar;
