import React, { useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import productService from "../services/productService";

const ProductosPage = () => {
    const [productActionTrigger, setProductActionTrigger] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleProductCreated = () => {
        setProductActionTrigger(t => t + 1);
        setShowForm(false);
        setEditingProduct(null);
    };

    const handleAddClick = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
            await productService.deleteProduct(id);
            setProductActionTrigger(t => t + 1);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingProduct(null);
    };

    return (
        <div>
            {!showForm && (
                <button
                    onClick={handleAddClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                >
                    Añadir producto
                </button>
            )}
            {showForm && (
                <ProductForm
                    onProductCreated={handleProductCreated}
                    onCancel={handleCancel}
                    initialData={editingProduct}
                />
            )}
            <ProductList
                key={productActionTrigger}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default ProductosPage;