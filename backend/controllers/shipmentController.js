const Shipment = require("../models/Shipment");
const Product = require("../models/Product");
const Buyer = require("../models/Buyer");

// Crear un nuevo envío
exports.createShipment = async (req, res) => {
  const { productId, buyerId, quantity } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const buyer = await Buyer.findByPk(buyerId);
    if (!buyer) {
      return res.status(404).json({ message: "Comprador no encontrado" });
    }

    if (quantity > product.stock) {
      return res.status(400).json({ message: "Stock insuficiente" });
    }

    const shipment = await Shipment.create({
      productId,
      buyerId,
      quantity,
      status: "En preparación",
    });

    product.stock -= quantity;
    await product.save();

    res.status(201).json({ message: "Envío creado exitosamente", shipment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener envíos del productor
exports.getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.findAll({
      include: [
        { model: Product, attributes: ["name"] },
        { model: Buyer, attributes: ["name", "country"] },
      ],
    });
    res.status(200).json(shipments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
