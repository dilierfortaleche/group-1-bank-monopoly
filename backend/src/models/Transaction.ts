import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
    gameId: mongoose.Types.ObjectId;
    player: string;
    amount: number;
    type: "Pago" | "Cobro" | "Banco" | "Embargo";
}

const transactionSchema = new Schema<ITransaction>({
    gameId: { type: Schema.Types.ObjectId, ref: "Game", required: true },
    player: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["Pago", "Cobro", "Banco", "Embargo"], required: true },
});

export default mongoose.model<ITransaction>("Transaction", transactionSchema);
