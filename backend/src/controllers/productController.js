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
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto" });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: "Faltan campos requeridos: name y price" });
        }
        const existing = await Product.findOne({ where: { name } });
        if (existing) {
            return res.status(409).json({ message: "El nombre del producto ya existe" });
        }
        if (isNaN(price) || (stock !== undefined && isNaN(stock))) {
            return res.status(400).json({ message: "Los campos price y stock deben ser numéricos" });
        }
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
        if (!name || !price) {
            return res.status(400).json({ message: "Faltan campos requeridos: name y price" });
        }
        if (isNaN(price) || (stock !== undefined && isNaN(stock))) {
            return res.status(400).json({ message: "Los campos price y stock deben ser numéricos" });
        }
        if (name !== product.name) {
            const existing = await Product.findOne({ where: { name } });
            if (existing) {
                return res.status(409).json({ message: "El nombre del producto ya existe" });
            }
        }
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
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        await product.destroy();
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto" });
    }
};