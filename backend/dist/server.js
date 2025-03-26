"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
// Cargar variables de entorno
dotenv_1.default.config();
// Inicializar Express
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use(express_1.default.json());
// Conectar a MongoDB
(0, database_1.default)();
// Importar rutas
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const gameRoutes_1 = __importDefault(require("./routes/gameRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
// Configurar rutas
app.use("/api/users", userRoutes_1.default);
app.use("/api/games", gameRoutes_1.default);
app.use("/api/transactions", transactionRoutes_1.default);
// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Error interno del servidor" });
});
// Levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});
