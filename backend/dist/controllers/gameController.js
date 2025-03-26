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
exports.joinGame = exports.createGame = void 0;
const Game_1 = __importDefault(require("../models/Game"));
const createGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, players } = req.body;
        const newGame = new Game_1.default({ code, players });
        yield newGame.save();
        res.status(201).json({ message: "Partida creada con éxito", gameId: newGame._id });
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear partida", error });
    }
});
exports.createGame = createGame;
const joinGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, player } = req.body;
        const game = yield Game_1.default.findOne({ code });
        if (!game)
            return res.status(404).json({ message: "Partida no encontrada" });
        game.players.push(player);
        yield game.save();
        res.json({ message: "Jugador añadido a la partida" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al unirse a la partida", error });
    }
});
exports.joinGame = joinGame;
exports.default = {
    createGame: exports.createGame,
    joinGame: exports.joinGame
};
