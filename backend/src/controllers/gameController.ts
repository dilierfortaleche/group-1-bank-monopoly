import { Request, Response } from "express";
import Game from "../models/Game";

export const createGame = async (req: Request, res: Response) => {
    try {
        const { code, players } = req.body;
        const newGame = new Game({ code, players });
        await newGame.save();
        res.status(201).json({ message: "Partida creada con éxito", gameId: newGame._id });
    } catch (error) {
        res.status(500).json({ message: "Error al crear partida", error });
    }
};

export const joinGame = async (req: Request, res: Response) => {
    try {
        const { code, player } = req.body;
        const game = await Game.findOne({ code });
        if (!game) return res.status(404).json({ message: "Partida no encontrada" });

        game.players.push(player);
        await game.save();
        res.json({ message: "Jugador añadido a la partida" });
    } catch (error) {
        res.status(500).json({ message: "Error al unirse a la partida", error });
    }
};

export default {
    createGame,
    joinGame
};