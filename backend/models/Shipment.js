const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Shipment = sequelize.define("Shipment", {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Products",
      key: "id",
    },
  },
  buyerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Buyers",
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING, // Ejemplo: "En tránsito", "Entregado"
    allowNull: false,
    defaultValue: "En preparación",
  },
  trackingNumber: {
    type: DataTypes.STRING, // Número de rastreo
    allowNull: true,
  },
  estimatedDelivery: {
    type: DataTypes.DATE, // Fecha estimada de entrega
    allowNull: true,
  },
});

module.exports = Shipment;
