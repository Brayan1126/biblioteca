import React, { useState, useEffect } from 'react';

import './Usuarios.css';

export const Usuarios = () => {
    // Definir estado para almacenar la lista de usuarios y los datos del nuevo usuario
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', apellido: '', documento: '', correo: '' });
    const [mostrarModal, setMostrarModal] = useState(false);
    const [indiceEditar, setIndiceEditar] = useState(null);
    const [busqueda, setBusqueda] = useState('');

    // Función para cargar usuarios desde el almacenamiento local
    useEffect(() => {
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'));
        if (usuariosGuardados) {
            setUsuarios(usuariosGuardados);
        }
    }, []);

    // Función para manejar cambios en los inputs del formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNuevoUsuario({ ...nuevoUsuario, [name]: value });
    };

    // Función para manejar cambios en el input de búsqueda
    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
    };

    // Función para agregar un nuevo usuario
    const guardarUsuario = (event) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
        const usuario = { ...nuevoUsuario };
        const nuevaListaUsuarios = [...usuarios];
        if (indiceEditar !== null) {
            nuevaListaUsuarios[indiceEditar] = usuario; // Editar usuario existente
        } else {
            nuevaListaUsuarios.push(usuario); // Agregar nuevo usuario
        }
        setUsuarios(nuevaListaUsuarios);
        localStorage.setItem('usuarios', JSON.stringify(nuevaListaUsuarios));
        // Limpiar los datos del nuevo usuario después de agregarlo o editarlo
        setNuevoUsuario({ nombre: '', apellido: '', documento: '', correo: '' });
        // Ocultar el modal después de agregar o editar el usuario
        setMostrarModal(false);
        // Restablecer el índice de edición
        setIndiceEditar(null);
    };

    // Función para eliminar un usuario
    const eliminarUsuario = (index) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmacion) {
            const nuevaListaUsuarios = [...usuarios];
            nuevaListaUsuarios.splice(index, 1);
            setUsuarios(nuevaListaUsuarios);
            localStorage.setItem('usuarios', JSON.stringify(nuevaListaUsuarios));
        }
    };

    // Función para cargar los datos del usuario en el modal de edición
    const cargarDatosUsuario = (index) => {
        setNuevoUsuario(usuarios[index]);
        setIndiceEditar(index);
        setMostrarModal(true);
    };

    // Filtrar usuarios según el término de búsqueda
    const usuariosFiltrados = usuarios.filter((usuario) => {
        const valoresUsuario = Object.values(usuario).join(' ').toLowerCase();
        return valoresUsuario.includes(busqueda.toLowerCase());
    });

    return (
        <div className='usersContainer'>
            <input
                type="text"
                placeholder="Buscar usuario..."
                value={busqueda}
                onChange={handleBusquedaChange}
            />
            <button className='buttonAgg' onClick={() => setMostrarModal(true)}>+ Agregar Usuario</button>
            {mostrarModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setMostrarModal(false)}>&times;</span>
                        <h3>{indiceEditar !== null ? "Editar Usuario" : "Agregar Usuario"}</h3>
                        <form onSubmit={guardarUsuario}>
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={nuevoUsuario.nombre}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="apellido">Apellido:</label>
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={nuevoUsuario.apellido}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="documento">Documento:</label>
                            <input
                                type="text"
                                id="documento"
                                name="documento"
                                value={nuevoUsuario.documento}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="correo">Correo:</label>
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                value={nuevoUsuario.correo}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit">{indiceEditar !== null ? "Guardar" : "Agregar"}</button>
                        </form>
                    </div>
                </div>
            )}
            <h3>Listado de Usuarios:</h3>
            <table className="tableUsuarios">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Documento</th>
                        <th>Correo</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosFiltrados.map((usuario, index) => (
                        <tr key={index}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellido}</td>
                            <td>{usuario.documento}</td>
                            <td>{usuario.correo}</td>
                            <td><button onClick={() => cargarDatosUsuario(index)}>Editar</button></td>
                            <td><button onClick={() => eliminarUsuario(index)}>Borrar</button></td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Usuarios;
