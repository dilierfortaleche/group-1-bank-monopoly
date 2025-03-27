import { Request, Response } from "express";
import Game from "../models/Game";

// Crear una nueva partida
export const createGame = async (req: Request, res: Response) => {
  console.log("📩 Recibí una petición en /game con body:", req.body);
  try {
    const { code } = req.body;
    const newGame = new Game({ code, players: [] }); // Inicializa con una lista vacía de jugadores
    await newGame.save();
    res
      .status(201)
      .json({ message: "Partida creada con éxito", gameId: newGame._id });
  } catch (error) {
    res.status(500).json({ message: "Error al crear partida", error });
  }
};

// Unirse a una partida
export const joinGame = async (req: Request, res: Response) => {
  try {
    const { code, player } = req.body;
    const game = await Game.findOne({ code });

    if (!game)
      return res.status(404).json({ message: "Partida no encontrada" });

    // Evitar que el mismo jugador se una más de una vez
    if (game.players.some((p: any) => p.nombre === player.nombre)) {
      return res
        .status(400)
        .json({ message: "El jugador ya está en la partida" });
    }

    game.players.push(player);
    await game.save();

    res.json({
      message: "Jugador añadido a la partida",
      players: game.players,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al unirse a la partida", error });
  }
};

// Obtener los jugadores de una partida
export const getPlayers = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const game = await Game.findOne({ code });

    if (!game)
      return res.status(404).json({ message: "Partida no encontrada" });

    res.json({ players: game.players });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener jugadores", error });
  }
};

export default {
  createGame,
  joinGame,
  getPlayers,
};
