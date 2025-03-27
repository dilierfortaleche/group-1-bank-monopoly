import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

// Interfaz para definir la estructura del usuario
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next(); // Si la contraseña no fue modificada, continúa

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("🔑 Contraseña encriptada correctamente");
    next();
  } catch (error) {
    console.error("❌ Error encriptando la contraseña:", error);

    if (error instanceof Error) {
      next(error); // ✅ Ahora TypeScript reconoce que error es un Error
    } else {
      next(new Error("Error desconocido en el proceso de encriptación")); // ✅ Manejo de errores inesperados
    }
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  try {
    if (!this.password) {
      throw new Error("No hay contraseña para comparar.");
    }
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error("❌ Error comparando contraseñas:", error);
    return false;
  }
};

const User = mongoose.model("User", userSchema);
export default User;
