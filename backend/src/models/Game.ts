import mongoose, { Schema, Document } from "mongoose";

export interface IGame extends Document {
    code: string;
    players: mongoose.Types.ObjectId[]; // IDs de los jugadores
}

const gameSchema = new Schema<IGame>({
    code: { type: String, required: true, unique: true },
    players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
});

export default mongoose.model<IGame>("Game", gameSchema);
