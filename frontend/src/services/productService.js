import axios from 'axios';

const API_URL = "http://localhost:3000/products";

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});

const productService = {
    getProducts: async () => {
        try {
            const response = await apiClient.get('/');
            return response.data;
        } catch (error) {
            console.error("Error fetching products: ", error);
            throw error.response?.data?.message || error.message || "Error desconocido al obtener productos";
        }
    },
    createProduct: async (productData) => {
        try {
            const response = await apiClient.post('/', productData);
            return response.data;
        } catch (error) {
            console.error("Error creating product:", error);
            throw error.response?.data?.message || error.message || "Error desconocido al crear producto";
        }
    },
    updateProduct: async (id, productData) => {
        try {
            const response = await apiClient.put(`/${id}`, productData);
            return response.data;
        } catch (error) {
            console.error("Error updating product:", error);
            throw error.response?.data?.message || error.message || "Error desconocido al actualizar producto";
        }
    },
    deleteProduct: async (id) => {
        try {
            await apiClient.delete(`/${id}`);
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error.response?.data?.message || error.message || "Error desconocido al eliminar producto";
        }
    },
};

export default productService;