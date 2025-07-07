const Product = require("../models/productModel");

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).send("Error getting products");
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).send("Product not found");
        res.json(product);
    } catch (error) {
        res.status(500).send("Error getting product");
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const product = await Product.create({ name, description, price, stock });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        product.name = name;
        product.description = description;
        product.price = price;
        product.stock = stock;
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).send("Product not found");
        await product.destroy();
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).send("Error deleting product");
    }
};