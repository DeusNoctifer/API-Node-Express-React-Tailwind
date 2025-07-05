import React from "react";
import BotonPrimario from "./BotonPrimario";
import Swal from "sweetalert2";
const TarjetaProducto = ({ nombre, precio, imagenUrl }) => {
    const manejadorAgregarCarrito = () => {
        Swal.fire({
            title: "¡Buen trabajo!",

            text: `Añadiendo "${nombre}" al carrito por $${precio}`,
            icon: "success",
            showCloseButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    };
    const manejadorVerDetalles = () => {
        Swal.fire({
            title: "¡Buen trabajo!",
            text: `Viendo detalles de "${nombre}"`,
            icon: "success",
            showCloseButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    };
    return (
        <div
            className="bg-white rounded-lg shadow-xl p-6 m-4 w-72 flex flex-col items-center justify-between"
        >
            <img
                src={imagenUrl}
                alt={nombre}
                className="w-48 h-48 object-cover rounded-md mb-4"
            />

            <h3
                className="text-xl font-semibold text-gray-800 mb-2 text-center"
            >
                {nombre}
            </h3>

            <p className="text-2xl font-bold text-blue-600 mb-4">${precio}</p>
            <div className="flex space-x-2 mt-auto">
                <BotonPrimario
                    texto="Añadir al Carrito"
                    onClick={manejadorAgregarCarrito}
                />
                <BotonPrimario texto="Ver Detalles" onClick={manejadorVerDetalles} />
            </div>
        </div>
    );
};
export default TarjetaProducto;
