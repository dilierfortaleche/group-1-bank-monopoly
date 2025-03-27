import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validar contraseñas
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "Tus contraseñas no coinciden!",
      });
      return;
    }

    try {
      console.log(name, email, password, confirmPassword);
      const response = await axios.post(
        "http://localhost:4000/api/users/register",
        {
          name,
          email,
          password,
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Registro exitoso",
          text: "Tu cuenta ha sido creada con éxito",
          icon: "success",
          confirmButtonText: "Ir a inicio de sesión",
        }).then(() => {
          navigate("/Inicio_Sesion");
        });
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Lo sentimos :(",
        text: "Tenemos problemas con nuestro servidor!",
      });
    }
  };

  return (
    <div className="p-8 m-5 rounded-lg shadow-lg bg-transparent border border-gray-300">
      <div>
        {/* Título */}
        <h2 className="text-black text-center text-4xl font-bold mb-6 ">
          Registrarte
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 ">
          {/* Nombre */}
          <div>
            <label className="block text-black text-xl font-bold mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 text-base rounded-md bg-white bg-opacity-70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-black text-xl font-bold mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 text-lg rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-black text-xl font-bold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 text-lg rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label className="block text-black text-xl font-bold mb-2">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 text-lg rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Botón de Registro */}
          <button
            type="submit"
            className="w-full font-[Oswald] font-extrabold py-3 text-[22px] rounded-lg border-none bg-white text-black shadow-lg hover:bg-gray-400 transition"
          >
            Registrarse
          </button>
          <Link
            to="/Inicio_Sesion"
            className="block text-center text-blue-900 text-[22px] underline drop-shadow-lg mt-2 "
          >
            Iniciar Sesión
          </Link>
        </form>
      </div>
    </div>
  );
}
