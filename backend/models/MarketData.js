const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const MarketData = sequelize.define("MarketData", {
  productType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  demand: {
    type: DataTypes.INTEGER, // Índice de demanda (ejemplo: 1-100)
    allowNull: false,
  },
  averagePrice: {
    type: DataTypes.FLOAT, // Precio promedio por unidad
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = MarketData;
