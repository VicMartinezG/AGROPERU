const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { getDashboardData } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", authenticateToken, getDashboardData);

module.exports = router;
