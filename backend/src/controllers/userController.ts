import { Request, Response } from "express";
import User from "../models/User";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar usuario", error });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }
        res.json({ message: "Inicio de sesión exitoso", userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error });
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios", error });
    }
};

export default {
    registerUser,
    loginUser,
    getAllUsers
};