import React, { useState, useEffect } from 'react';
import './Libros.css';

export const Libros = () => {
    // Definir estado para almacenar la lista de libros y los datos del nuevo libro
    const [libros, setLibros] = useState([]);
    const [nuevoLibro, setNuevoLibro] = useState({ nombre: '', genero: '', autor: '', ISBN: '', disponible: '' });
    const [mostrarModal, setMostrarModal] = useState(false);
    const [indiceEditar, setIndiceEditar] = useState(null);
    const [busqueda, setBusqueda] = useState('');

    // Función para cargar libros desde el almacenamiento local
    useEffect(() => {
        const librosGuardados = JSON.parse(localStorage.getItem('libros'));
        if (librosGuardados) {
            setLibros(librosGuardados);
        }
    }, []);

    // Función para manejar cambios en los inputs del formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNuevoLibro({ ...nuevoLibro, [name]: value });
    };

    // Función para manejar cambios en el input de búsqueda
    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
    };

    // Función para agregar un nuevo libro o guardar uno editado
    const guardarLibro = (event) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
        if (nuevoLibro.disponible === false) {
            alert("El libro no se puede editar porque no está disponible.");
            return; // Evitar que se guarde el libro
        }
        const libro = { ...nuevoLibro, disponible: true };
        const nuevaListaLibros = [...libros];
        if (indiceEditar !== null) {
            nuevaListaLibros[indiceEditar] = libro; // Editar libro existente
        } else {
            nuevaListaLibros.push(libro); // Agregar nuevo libro
        }
        setLibros(nuevaListaLibros);
        localStorage.setItem('libros', JSON.stringify(nuevaListaLibros));
        // Limpiar los datos del nuevo libro después de agregarlo o editarlo
        setNuevoLibro({ nombre: '', genero: '', autor: '', ISBN: '', disponible: '' });
        // Ocultar el modal después de agregar o editar el libro
        setMostrarModal(false);
        // Restablecer el índice de edición
        setIndiceEditar(null);
    };

    // Función para eliminar un libro
    const eliminarLibro = (index) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este libro?");
        if (confirmacion) {
            const nuevaListaLibros = [...libros];
            nuevaListaLibros.splice(index, 1);
            setLibros(nuevaListaLibros);
            localStorage.setItem('libros', JSON.stringify(nuevaListaLibros));
        }
    };

    // Función para cargar los datos del libro en el modal de edición
    const cargarDatosLibro = (index) => {
        setNuevoLibro(libros[index]);
        setIndiceEditar(index);
        setMostrarModal(true);
    };

    // Filtrar libros según el término de búsqueda
    const librosFiltrados = libros.filter((libro) => {
        const valoresLibro = Object.values(libro).join(' ').toLowerCase();
        return valoresLibro.includes(busqueda.toLowerCase());
    });

    return (
        <div className='librosContainer'>
            <input
                type="text"
                placeholder="Buscar libro..."
                value={busqueda}
                onChange={handleBusquedaChange}
            />
            <button className='buttonAgg' onClick={() => setMostrarModal(true)}>+ Agregar Libro</button>
            {mostrarModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setMostrarModal(false)}>&times;</span>
                        <h3>{indiceEditar !== null ? "Editar Libro" : "Agregar Libro"}</h3>
                        <form onSubmit={guardarLibro}>
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={nuevoLibro.nombre}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="genero">Género:</label>
                            <input
                                type="text"
                                id="genero"
                                name="genero"
                                value={nuevoLibro.genero}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="autor">Autor:</label>
                            <input
                                type="text"
                                id="autor"
                                name="autor"
                                value={nuevoLibro.autor}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="ISBN">ISBN:</label>
                            <input
                                type="text"
                                id="ISBN"
                                name="ISBN"
                                value={nuevoLibro.ISBN}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit">{indiceEditar !== null ? "Guardar" : "Agregar"}</button>
                        </form>
                    </div>
                </div>
            )}
            <h3>Listado de Libros:</h3>
            <table className="tableLibros">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Género</th>
                        <th>Autor</th>
                        <th>ISBN</th>
                        <th>Disponible</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {librosFiltrados.map((libro, index) => (
                        <tr key={index}>
                            <td>{libro.nombre}</td>
                            <td>{libro.genero}</td>
                            <td>{libro.autor}</td>
                            <td>{libro.ISBN}</td>
                            <td>{libro.disponible ? 'Sí' : 'No'}</td>
                            <td><button onClick={() => cargarDatosLibro(index)}>Editar</button></td>
                            <td><button onClick={() => eliminarLibro(index)}>Borrar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Libros;
