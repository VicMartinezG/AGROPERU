const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const { sequelize } = require("./config/database");
//const db = require("./config/database");
const Product = require("./models/Product");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const catalogRoutes = require("./routes/catalogRoutes");
const buyerRoutes = require("./routes/buyerRoutes");
const marketDataRoutes = require("./routes/marketDataRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Inicializar app y cargar configuraciones
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Probar conexión a la base de datos
sequelize
  .authenticate()
  .then(() => console.log("Conexión exitosa a la base de datos"))
  .catch((err) => console.error("Error conectando a la base de datos:", err));

// Rutas iniciales
app.get("/", (req, res) => {
  res.send("Bienvenido a AgroPerú API");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Sección para sincronizar las tablas automáticamente
sequelize
  .sync({ force: false }) // Cambia a true para forzar sobrescritura de tablas
  .then(() => console.log("Tablas sincronizadas"))
  .catch((err) => console.error("Error sincronizando tablas:", err));


// Conecta las rutas al servidor
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/catalog", catalogRoutes);
app.use("/api/buyers", buyerRoutes);
app.use("/api/market-data", marketDataRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/dashboard", dashboardRoutes);