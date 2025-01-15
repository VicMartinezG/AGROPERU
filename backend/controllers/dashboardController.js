const Product = require("../models/Product");
const Shipment = require("../models/Shipment");
const MarketData = require("../models/MarketData");

exports.getDashboardData = async (req, res) => {
  try {
    const totalProducts = await Product.count();
    const totalShipments = await Shipment.count();
    const recentMarketUpdates = await MarketData.findAll({
      order: [["date", "DESC"]],
      limit: 5,
    });

    res.status(200).json({
      totalProducts,
      totalShipments,
      recentMarketUpdates,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
