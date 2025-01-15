const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// Obtener información del perfil
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar perfil del productor
router.put("/", authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, phone, companyName, location, productType } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phone = phone || user.phone;
    user.companyName = companyName || user.companyName;
    user.location = location || user.location;
    user.productType = productType || user.productType;

    await user.save();
    res.status(200).json({ message: "Perfil actualizado exitosamente", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
