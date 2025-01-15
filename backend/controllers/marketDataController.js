const MarketData = require("../models/MarketData");

// Obtener datos de mercado por tipo de producto
exports.getMarketTrends = async (req, res) => {
  const { productType, region } = req.query;
  try {
    const marketData = await MarketData.findAll({
      where: { productType, region },
      order: [["date", "DESC"]],
      limit: 10,
    });
    res.status(200).json(marketData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
