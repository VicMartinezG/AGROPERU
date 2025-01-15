const Buyer = require("../models/Buyer");

// Crear comprador
exports.createBuyer = async (req, res) => {
  const { name, companyName, email, country, interestedProducts } = req.body;
  try {
    const buyer = await Buyer.create({
      name,
      companyName,
      email,
      country,
      interestedProducts: JSON.stringify(interestedProducts), // Guardar como JSON
    });
    res.status(201).json({ message: "Comprador registrado exitosamente", buyer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener compradores registrados
exports.getBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.findAll();
    res.status(200).json(buyers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
