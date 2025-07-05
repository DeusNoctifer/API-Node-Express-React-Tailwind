import React from "react";
export default function BotonPrimario({ texto, onClick }) {
    return (
        <button className="bg-blue-500 px-3 py-2 text-white rounded font-semibold
                        hover:bg-blue-700 shadow-lg transition
                        duration-300 easy-in-out transform hover:scale-105" 
                        onClick={onClick}>
            {texto}
        </button>
    )
}