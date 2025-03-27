import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function BalanceJugadores() {
  const navigate = useNavigate();

  const [players, setPlayers] = useState([
    { id: 1, name: "Jugador 1", balance: 100 },
    { id: 2, name: "Jugador 2", balance: 250 },
    { id: 3, name: "Jugador 3", balance: 75 },
  ]);

  const handleReportTransc = () => {
    navigate("/Reportar_transaccion");
  };
  const handleFinallyTurn = () => {
    Swal.fire({
      title: "Deseas terminar tu turno!",
      text: `¿seguro que realizaste todas tus transacciones?`,
      icon: "warning",
      confirmButtonText: "terminar turno",
      showCancelButton: true,
      cancelButtonText: "todavia no",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Siguiente jugador");
      }
    });
  };
  const handleBancaRota = () => {
    Swal.fire({
      title: "Declararse en banca rota!",
      text: `Estaras fuera del juego si te declaras en bancarrota`,
      icon: "success",
      confirmButtonText: "Declararse en banca rota",
      showCancelButton: true,
      cancelButtonText: "Seguir en partida",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/Lobby_Game");
      }
    });
  };
  const handleViewHistory = () => {
    navigate("/Historial_transaccion");
  };
  return (
    <div className="p-6 mt-10 bg-transparent rounded-lg shadow-lg w-90 text-center">
      <h2 className="text-black text-3xl font-bold drop-shadow-[0_10px_10px_rgba(255,255,255,1)] mb-4">
        Saldo de Jugadores
      </h2>

      {/* Lista de jugadores con saldo */}
      <ul className="bg-gray-200 p-3 rounded-md shadow-md w-full">
        {players.map((player) => (
          <li
            key={player.id}
            className="text-lg text-gray-800 flex justify-between p-2 border-b"
          >
            <span>{player.name}</span>
            <span className="font-bold text-green-600">${player.balance}</span>
          </li>
        ))}
      </ul>

      {/* Botones */}
      <div className="mt-4 space-y-3">
        <button
          onClick={() => handleReportTransc()}
          className="w-full p-3 text-lg rounded-md bg-blue-500 text-white hover:bg-blue-600 transition shadow-md"
        >
          Reportar Transacción
        </button>
        <button
          onClick={() => handleFinallyTurn()}
          className="w-full p-3 text-lg rounded-md bg-green-600 text-white hover:bg-green-700 transition shadow-md"
        >
          Terminar turno
        </button>
        <button
          onClick={() => handleViewHistory()}
          className="w-full p-3 text-lg rounded-md bg-gray-500 text-white hover:bg-gray-600 transition shadow-md"
        >
          Ver Historial de Transacciones
        </button>
        <button
          onClick={() => handleBancaRota()}
          className="w-full p-3 text-lg rounded-md bg-red-500 text-white hover:bg-red-600 transition shadow-md"
        >
          Declararse en banca rota
        </button>
      </div>
    </div>
  );
}
