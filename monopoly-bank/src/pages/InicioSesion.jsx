import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/users/Login", {
        email,
        password,
      });

      // Verificar si la respuesta es correcta
      if (response.status === 200) {
        Swal.fire({
          icon: "Dreag me",
          title: "Bienvenido!",
        });
        navigate("/Lobby_Game");
      } else {
        Swal.fire({
          icon: "error",
          title: "Lo sentimos :(",
          text: response.data.message || "Revisa la información ingresada!",
        });

        console.error("Error en la información ingresada.");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      Swal.fire({
        icon: "error",
        title: "Lo sentimos :(",
        text: err.response?.data?.message || "Tenemos problemas con nuestro servidor!",
      });
    }
  };

  return (
    <div className="p-8 m-5 rounded-lg shadow-lg bg-transparent border border-gray-300">
      {/* Título */}
      <h2 className="text-black text-center text-4xl font-bold mb-6">Iniciar Sesión</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 text-base rounded-md bg-white bg-opacity-50 border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
            placeholder="name@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 text-base rounded-md bg-white bg-opacity-50 border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
            required
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full p-3 text-lg rounded-md bg-white bg-opacity-80 border border-gray-300 shadow-md 
            font-bold text-black hover:bg-gray-400 transition"
        >
          Ingresar
        </button>
        
        <Link to="/Registro" className="block text-center text-blue-900 text-[22px] underline drop-shadow-lg mt-2">
          Registrarse
        </Link>
      </form>
    </div>
  );
}
