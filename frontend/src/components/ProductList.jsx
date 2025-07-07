import React, { useEffect, useState } from "react";
import productService from "../services/productService";

const ProductList = ({ onEdit, onDelete }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.getProducts();
            setProducts(data);
        } catch (err) {
            setError("Error al cargar los productos. Inténtalo de nuevo más tarde.");
            console.error("Failed to fetch products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <p className="text-gray-600">Cargando productos...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (products.length === 0) return <p className="text-gray-600">No hay productos registrados.</p>;

    return (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Lista de Productos</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Nombre</th>
                            <th className="px-4 py-3">Descripción</th>
                            <th className="px-4 py-3">Precio</th>
                            <th className="px-4 py-3">Stock</th>
                            <th className="px-4 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-4 py-4">{product.id}</td>
                                <td className="px-4 py-4">{product.name}</td>
                                <td className="px-4 py-4">{product.description}</td>
                                <td className="px-4 py-4">${product.price}</td>
                                <td className="px-4 py-4">{product.stock}</td>
                                <td className="px-4 py-4 flex gap-2">
                                    <button
                                        onClick={() => onEdit && onEdit(product)}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => onDelete && onDelete(product.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;