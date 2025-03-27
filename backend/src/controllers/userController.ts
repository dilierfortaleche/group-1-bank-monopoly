import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error(
    "⚠️ JWT_SECRET no está definido en las variables de entorno."
  );
}

// 📌 REGISTRAR USUARIO
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log("📝 Registrando usuario...");

    // Validar campos obligatorios
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya está registrado" });
    }

    // Encriptar la contraseña

    // Crear usuario
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("❌ Error en registerUser:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

// 📌 INICIAR SESIÓN
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    if (password !== user.password)
      return res.status(400).json({ error: "Contraseña incorrecta" });

    res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

// 📌 OBTENER TODOS LOS USUARIOS (sin contraseña)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error en getAllUsers:", error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

export default { registerUser, loginUser, getAllUsers };
