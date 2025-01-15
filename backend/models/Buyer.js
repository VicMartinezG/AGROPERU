const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Buyer = sequelize.define("Buyer", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  interestedProducts: {
    type: DataTypes.TEXT, // Lista de productos en formato JSON
    allowNull: true,
  },
});

module.exports = Buyer;
