import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LobbyPlayer() {
  const navigate = useNavigate();

  const [gameCode] = useState("ABC123"); // Código de la partida
  const [players, setPlayers] = useState([
    { id: 1, name: "Jugador 1" },
    { id: 2, name: "Jugador 2" },
  ]);
  const [gameStarting, setGameStarting] = useState(false);

  setTimeout(() => {
    navigate("/Banco");
  }, 4000);

  return (
    
      <div className="p-6 mt-10 bg-white rounded-lg shadow-lg w-90 text-center">
        <h2 className="text-orange-500 text-3xl font-bold drop-shadow-lg mb-4">
          Esperando Jugadores...
        </h2>

        {/* Código de la partida */}
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700 mb-4">Código de la Partida:</p>
          <span className="bg-gray-200 p-2 rounded-md text-lg font-bold">{gameCode}</span>
        </div>

        {/* Lista de jugadores */}
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Jugadores ({players.length}/6):</h3>
        <ul className="bg-gray-200 p-3 rounded-md shadow-md">
          {players.map((player) => (
            <li key={player.id} className="text-lg text-gray-800">
              {player.name}
            </li>
          ))}
        </ul>

        {/* Mensaje de inicio */}
        {gameStarting ? (
          <p className="mt-4 text-green-500 font-bold text-xl animate-pulse">¡Iniciando partida!</p>
        ) : (
          <p className="mt-4 text-gray-500 text-lg">Esperando que master inicie...</p>
        )}
      </div>
  );
}

