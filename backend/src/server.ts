import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";

// Cargar variables de entorno
dotenv.config();

// Inicializar Express
const app: Application = express();

// Middlewares
// Middleware global
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Importar rutas
import userRoutes from "./routes/userRoutes";
import gameRoutes from "./routes/gameRoutes";
import transactionRoutes from "./routes/transactionRoutes";

// Configurar rutas
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/transactions", transactionRoutes);

// Manejo de errores global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: "Error interno del servidor" });
});

// Levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});
