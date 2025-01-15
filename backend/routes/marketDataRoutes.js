const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { getMarketTrends } = require("../controllers/marketDataController");

const router = express.Router();

router.get("/", authenticateToken, getMarketTrends);

module.exports = router;
