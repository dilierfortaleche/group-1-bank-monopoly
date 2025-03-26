import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

// Interfaz para definir la estructura del usuario
export interface IUser extends Document {
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

// Esquema del usuario
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// 🔹 Encripta la contraseña antes de guardar el usuario
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next(); // Si no se modificó, pasa al siguiente middleware
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔹 Método para comparar contraseñas
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
