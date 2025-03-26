import { Request, Response } from 'express';
import Player from '../models/Player';

export const getPlayers = async (req: Request, res: Response) => {
    try {
        const players = await Player.find().populate('id_usuario id_partida');
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener jugadores', error });
    }
};

export const createPlayer = async (req: Request, res: Response) => {
    try {
        const { id_usuario, id_partida, saldo } = req.body;
        const newPlayer = new Player({ id_usuario, id_partida, saldo });
        await newPlayer.save();
        res.status(201).json(newPlayer);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear jugador', error });
    }
};

export const getPlayerById = async (req: Request, res: Response) => {
    try {
        const player = await Player.findById(req.params.id).populate('id_usuario id_partida');
        if (!player) return res.status(404).json({ message: 'Jugador no encontrado' });
        res.json(player);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener jugador', error });
    }
};

export const getAllPlayers = async (req: Request, res: Response) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener jugadores', error });
    }
};


export const deletePlayer = async (req: Request, res: Response) => {
    try {
        const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
        if (!deletedPlayer) return res.status(404).json({ message: 'Jugador no encontrado' });
        res.json({ message: 'Jugador eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar jugador', error });
    }
};

export default {
    getPlayers,
    createPlayer,
    getAllPlayers,
    deletePlayer
};