const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  createProduct,
  getUserProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/catalogController");

const router = express.Router();

router.post("/", authenticateToken, createProduct);
router.get("/", authenticateToken, getUserProducts);
router.put("/:id", authenticateToken, updateProduct);
router.delete("/:id", authenticateToken, deleteProduct);

module.exports = router;
