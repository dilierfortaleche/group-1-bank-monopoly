import { Request, Response } from "express";
import Transaction from "../models/Transaction";

// Registrar una nueva transacción
export const reportTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const { gameId, player, amount, type } = req.body;
        const newTransaction = new Transaction({ gameId, player, amount, type });
        await newTransaction.save();
        res.status(201).json({ message: "Transacción registrada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar transacción", error });
    }
};

// Obtener historial de transacciones por gameId
export const getTransactionHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { gameId } = req.params; // gameId viene de la URL
        const transactions = await Transaction.find({ gameId }).sort({ createdAt: -1 });

        if (!transactions.length) {
            res.status(404).json({ message: "No hay transacciones registradas para este juego." });
            return; // ✅ Evita que la función continúe ejecutándose después de enviar la respuesta
        }

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el historial de transacciones", error });
    }
};

export default {
    reportTransaction,
    getTransactionHistory
};
