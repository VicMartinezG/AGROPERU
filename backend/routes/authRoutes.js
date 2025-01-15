const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;


// ruta para obtener información del usuario logueado
router.get("/profile", authenticateToken, async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, { attributes: { exclude: ["password"] } });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });