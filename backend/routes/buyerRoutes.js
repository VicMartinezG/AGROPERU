const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { createBuyer, getBuyers } = require("../controllers/buyerController");

const router = express.Router();

router.post("/", authenticateToken, createBuyer);
router.get("/", authenticateToken, getBuyers);

module.exports = router;
