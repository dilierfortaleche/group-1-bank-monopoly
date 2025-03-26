import mongoose from "mongoose";



const transactionSchema = new mongoose.Schema({
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    player: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["Pago", "Cobro", "Banco", "Embargo"], required: true },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
