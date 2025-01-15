const Product = require("../models/Product");

// Crear producto
exports.createProduct = async (req, res) => {
  const { name, description, price, stock, imageUrl } = req.body;
  try {
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      imageUrl,
      userId: req.user.id, // ID del usuario logueado
    });
    res.status(201).json({ message: "Producto creado exitosamente", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener productos del usuario
exports.getUserProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ where: { userId: req.user.id } });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, imageUrl } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product || product.userId !== req.user.id) {
      return res.status(404).json({ message: "Producto no encontrado o acceso denegado" });
    }
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.imageUrl = imageUrl || product.imageUrl;
    await product.save();
    res.status(200).json({ message: "Producto actualizado exitosamente", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product || product.userId !== req.user.id) {
      return res.status(404).json({ message: "Producto no encontrado o acceso denegado" });
    }
    await product.destroy();
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
