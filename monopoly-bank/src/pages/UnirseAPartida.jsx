import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function JoinGame() {
  const navigate = useNavigate();

  const [gameCode, setGameCode] = useState("");

  const handleVolver = () => {
    navigate("/Lobby_Game");
  };

  const handleJoinGame = () => {
    if (gameCode.trim() === "") {
      Swal.fire({
        title: "¡Ingresa un Codigo!",
        text: `Debes ingresar un codigo para unirte`,
        icon: "error",
      })
      return;
    }

    Swal.fire({
      title: "¡Unido con éxito!",
      text: `Te has unido a la partida con código: ${gameCode}`,
      icon: "success",
      confirmButtonText: "Entrar",
    }).then(() => {
      navigate("/Lobby_player");
    });

    
  };
  
  return (
    
      <div className="p-8 bg-transparent rounded-lg shadow-lg w-90 text-center mt-15 ">
        <h2 className="text-black text-3xl font-bold drop-shadow-lg mb-4 ">
          Unirse a Partida
        </h2>

        {/* Campo para mostrar el ID */}
        <input
          type="text"
          value={gameCode}
          onChange={(e) => setGameCode(e.target.value)}
          className="w-full p-3 text-lg rounded-md bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm text-center"
          placeholder="Código de partida"
        />

        {/* Botón para generar la partida */}
        <button
          onClick={handleJoinGame}
          className="mt-4 w-full p-3 text-lg rounded-md bg-green-500 text-white font-bold hover:bg-green-600 transition shadow-md"
        >
          Unirse a Partida
        </button>

        <button onClick={() => handleVolver()}
          className="w-full mt-5 p-3 text-lg rounded-md bg-gray-500 text-white hover:bg-gray-600 transition shadow-md">
            Volver 
        </button>
      </div>
    
  );
}
