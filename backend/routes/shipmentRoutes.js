const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { createShipment, getShipments } = require("../controllers/shipmentController");

const router = express.Router();

router.post("/", authenticateToken, createShipment);
router.get("/", authenticateToken, getShipments);

module.exports = router;
