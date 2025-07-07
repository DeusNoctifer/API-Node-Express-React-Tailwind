import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Importa Routes, Route y
Link
import TarjetaProducto from './components/TarjetaProducto';
import BotonPrimario from './components/BotonPrimario';
import Navegacion from './components/Navegacion';

import UserList from './components/UserList';
import UserForm from './components/UserForm';
import ProductosPage from "./components/ProductsPage";



import './App.css';
function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [showUserForm, setShowUserForm] = useState(false);
    const [userActionTrigger, setUserActionTrigger] = useState(0);
    const handleEditUser = (user) => {
        setCurrentUser(user);
        setShowUserForm(true);
    };
    const handleSaveUser = () => {
        setCurrentUser(null);
        setShowUserForm(false);
        setUserActionTrigger(prev => prev + 1);
    };
    const handleCancelEdit = () => {
        setCurrentUser(null);
        setShowUserForm(false);
    };
    return (
        <div className='min-h-screen flex flex-col items-center bg-gray-100 p-4'>
            {/* Modifica la Navegación para usar Link en lugar de <a> */}
            <nav className="bg-blue-800 p-4 shadow-md w-full">
                <div className="container mx-auto flex items-center justify-between">
                    <Link to="/" className="text-white text-2xl font-bold hover:text-blue-200 transition duration-300">
                        Mi tienda online
                    </Link>
                    <div className="flex space-x-6">
                        <Link to="/" className="text-white hover:text-blue-200 text-lg transition duration-300">Inicio</Link>
                        <Link to="/users" className="text-white hover:text-blue-200 text-lg transition duration-300">Usuarios</Link>
                        <Link to="/productos" className="text-white hover:text-blue-200 text-lg transition duration-300">Productos</Link>
                    </div>
                </div>
            </nav>
            <main className='flex flex-col items-center p-4 w-full max-w-7xl mx-auto'>
                <Routes> {/* Define tus rutas aquí */}
                    <Route path="/" element={
                        <>
                            <h1 className='text-5xl font-extrabold text-blue-700 mb-8'>Nuestra
                                tienda online</h1>
                            <h2 className='text-4xl font-bold text-gray-800 mt-12 mb-8'>Nuestros
                                productos</h2>
                            {/* Aquí iría el contenido de tu página de inicio, como TarjetaProducto*/}
                            {/* Por ahora, dejaremos un placeholder simple para el inicio */}
                            <p className='mt-12 text-gray-600'>Bienvenido a la tienda. ¡Explora
                                nuestra selección!</p>
                            {/* Si quieres que las tarjetas de producto estén en la raíz, ponlasaquí */}
                        </>
                    } />
                    <Route path="/users" element={
                        <>
                            <h1 className='text-5xl font-extrabold text-blue-700 mb-8'>Gestión de
                                Usuarios</h1>
                            {!showUserForm && (
                                <div className="mb-8">
                                    <BotonPrimario texto="Crear Nuevo Usuario" onClick={() =>

                                        setShowUserForm(true)} />
                                </div>
                            )}
                            {showUserForm && (
                                <UserForm
                                    currentUser={currentUser}
                                    onSave={handleSaveUser}
                                    onCancel={handleCancelEdit}
                                />
                            )}
                            <UserList
                                onEditUser={handleEditUser}
                                onUserCreatedOrUpdated={userActionTrigger}
                            />

                        </>
                    } />
                    {/* Puedes añadir más rutas si las necesitas, por ejemplo para productos,
ofertas, etc. */}
                    <Route path="/productos" element={
                        <ProductosPage />
                        } 
                    />

                    <Route path='/ofertas' element={
                        <>
                            <div className='w-full text-center'>
                                <h1 className="text-5xl font-extrabold text-blue-700 mb-8">¡Ofertas
                                    Exclusivas!</h1>
                                <p className="text-2xl text-gray-700 mb-12">¡No te pierdas esta
                                    promoción por tiempo limitado!</p>
                                <div className='flex flex-wrap justify-center gap-6'>
                                    <TarjetaProducto
                                        nombre="Smartwatch X1 (50% OFF)"
                                        precio={100}
                                        imagenUrl={"https://placehold.co/200x200?text=SmartWatch+Oferta"}
                                    />
                                    <TarjetaProducto
                                        nombre="Teclado Mecánico (Envío Gratis)"
                                        precio={129}
                                        imagenUrl={"https://placehold.co/200x200?text=Teclado+Envio"}
                                    />
                                    <TarjetaProducto
                                        nombre="Mouse Gaming RGB (30% OFF)o"
                                        precio={85}
                                        imagenUrl={"https://placehold.co/200x200?text=Mouse+Oferta"}
                                    />

                                </div>
                            </div>
                        </>
                    } />
                    <Route path='/contacto' element={
                        <>

                            <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-8">

                                <h1 className="text-5xl font-extrabold text-blue-700 mb-8 text-
center">Contáctanos</h1>

                                <p className="text-lg text-gray-700 mb-8 text-center">¿Tienes alguna
                                    pregunta, comentario o necesitas ayuda? ¡No dudes en contactarnos!</p>
                                <form className="space-y-6" action="">
                                    <div>
                                        <label htmlFor="nombreContacto" className="block text-gray-700

text-sm font-bold mb-2">Tu nombre</label>

                                        <input
                                            type="text"
                                            id="nombreContacto"
                                            name="nombre"
                                            placeholder="Escribe aqui tu nombre completo"
                                            className="shadow appearance-none border rounded w-full py-2
px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="emailContacto" className="block text-gray-700

text-sm font-bold mb-2">
                                            Tu Email:
                                        </label>
                                        <input
                                            type="email"
                                            id="emailContacto"
                                            name="email"
                                            placeholder="tu@ejemplo.com"
                                            className="shadow appearance-none border rounded w-full py-2
px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                                            required
                                        />
                                    </div>
                                    <div>

                                        <label htmlFor="mensajeContacto" className="block text-gray-
700 text-sm font-bold mb-2">

                                            Tu Mensaje:
                                        </label>
                                        <textarea
                                            id="mensajeContacto"
                                            name="mensaje"
                                            rows="5"
                                            placeholder="Escribe tu mensaje aquí..."
                                            className="shadow appearance-none border rounded w-full py-2
px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                                            required

                                        ></textarea>
                                    </div>
                                    <div className="flex justify-end">
                                        <BotonPrimario texto="Enviar Mensaje" type="submit" />
                                    </div>
                                </form>
                            </div>
                        </>
                    } />
                    {/* Ruta de fallback para 404 - no match */}
                    <Route path="*" element={<h2 className='text-4xl font-bold text-gray-800
mt-12 mb-8 text-red-500'>404 - Página no encontrada</h2>} />
                </Routes>
            </main>
        </div>
    );
}
export default App;