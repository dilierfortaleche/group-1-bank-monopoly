import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    players: [{ type: String }], // Lista de emails de jugadores
});

const Game = mongoose.model("Game", gameSchema);
export default Game;
