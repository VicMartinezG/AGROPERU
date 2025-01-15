const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Registro de usuario
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, phone, companyName, location, productType, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      companyName,
      location,
      productType,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Usuario registrado con éxito", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Inicio de sesión
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    res.status(200).json({ message: "Inicio de sesión exitoso", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//JWT al inicar sesion
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Contraseña incorrecta" });

    // Generar el token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Inicio de sesión exitoso", user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};