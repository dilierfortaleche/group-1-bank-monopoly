import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en las variables de entorno.");
}

const JWT_SECRET = process.env.JWT_SECRET;

// 📝 REGISTRAR USUARIO
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "El usuario ya existe" });

    // Encriptar la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario con la contraseña encriptada
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

// 📝 INICIAR SESIÓN
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Comparar la contraseña ingresada con la encriptada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    // Generar un token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

// 📝 OBTENER TODOS LOS USUARIOS
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password"); // Excluir la contraseña
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
};

export default { registerUser, loginUser, getAllUsers };