"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const newUser = new User_1.default({ email, password });
        yield newUser.save();
        res.status(201).json({ message: "Usuario registrado con éxito" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al registrar usuario", error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }
        res.json({ message: "Inicio de sesión exitoso", userId: user._id });
    }
    catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error });
    }
});
exports.loginUser = loginUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios", error });
    }
});
exports.getAllUsers = getAllUsers;
exports.default = {
    registerUser: exports.registerUser,
    loginUser: exports.loginUser,
    getAllUsers: exports.getAllUsers
};
