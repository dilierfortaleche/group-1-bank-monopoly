import mongoose, { Schema, Document } from 'mongoose';

export interface IPlayer extends Document {
    id_usuario: mongoose.Types.ObjectId;
    id_partida: mongoose.Types.ObjectId;
    saldo: number;
}

const PlayerSchema = new Schema<IPlayer>({
    id_usuario: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    id_partida: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
    saldo: { type: Number, default: 0 }
});

export default mongoose.model<IPlayer>('Player', PlayerSchema);
