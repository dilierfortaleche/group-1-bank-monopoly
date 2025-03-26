import React, { useEffect, useState } from "react";

import {useNavigate } from "react-router-dom";

export default function Lobby() {
  const navigate = useNavigate();

  const [gameId, setGameId] = useState("");
  
  useEffect(() =>{
    const newGameCode = Math.random().toString(36).substr(2, 4); // Generar ID aleatorio
    setGameId(newGameCode);
  }, []);

  const [players, setPlayers] = useState([
    { id: 1, name: "Jugador 1" },
    { id: 2, name: "Jugador 2" },
  ]); // Lista de jugadores

  const handleCopyCode = () => {
    navigator.clipboard.writeText(gameId);
  };

  const handleinitGame = () =>{
    navigate("/Banco");
  }
  
  return (
   
      <div className="p-3 bg-transparent mt-10 rounded-lg shadow-lg w-90 text-center">
        <h2 className="text-black text-3xl font-bold drop-shadow-lg mb-4">
          Lobby de la Partida
        </h2>

        {/* Código de la partida */}
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">Código de la Partida:</p>
          <div className="flex items-center justify-center space-x-2">
            <span className="bg-gray-200 p-2 rounded-md text-lg font-bold">{gameId}</span>
            <button
              onClick={handleCopyCode}
              className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Copiar
            </button>
          </div>
        </div>

        {/* Lista de jugadores */}
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Jugadores:</h3>
        <ul className="bg-gray-200 p-3 rounded-md shadow-md">
          {players.map((player) => (
            <li key={player.id} className="text-lg text-gray-800">
              {player.name}
            </li>
          ))}
        </ul>

        {/* Botón para comenzar la partida (puede conectarse al backend) */}
        <button onClick={handleinitGame}
         className="mt-4 w-full p-3 text-lg rounded-md bg-green-500 text-white hover:bg-blue-600 transition shadow-md">
          Iniciar Partida
        </button>
      </div>

  );
}

