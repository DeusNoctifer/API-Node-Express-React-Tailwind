import React, { useState, useEffect } from "react";
import productService from "../services/productService";

const ProductForm = ({ onProductCreated, onCancel, initialData }) => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name || "",
                description: initialData.description || "",
                price: initialData.price || "",
                stock: initialData.stock || ""
            });
        } else {
            setForm({
                name: "",
                description: "",
                price: "",
                stock: ""
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (initialData && initialData.id) {
                await productService.updateProduct(initialData.id, {
                    ...form,
                    price: parseFloat(form.price),
                    stock: parseInt(form.stock, 10) || 0
                });
            } else {
                await productService.createProduct({
                    ...form,
                    price: parseFloat(form.price),
                    stock: parseInt(form.stock, 10) || 0
                });
            }
            if (onProductCreated) onProductCreated();
        } catch (err) {
            setError(err?.toString() || "Error al guardar producto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">
                {initialData ? "Editar Producto" : "Añadir Producto"}
            </h2>
            {/* ...campos y botones igual que antes... */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Precio</label>
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Stock</label>
                <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    min="0"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                    {loading ? "Guardando..." : initialData ? "Guardar Cambios" : "Añadir Producto"}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default ProductForm;