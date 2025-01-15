const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.ENUM(
      "Huancayo", "Chupaca", "Junín", "Tarma", 
      "Yauli", "Jauja", "Chanchamayo", "Satipo", "Concepción"
    ),
    allowNull: false,
  },
  productType: {
    type: DataTypes.ENUM(
      "Cereales", "Frutales", "Hortalizas", 
      "Tuberculos", "Oleaginosas", "Cultivos textiles"
    ),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
