import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HistorialTransacciones() {
  const navigate = useNavigate();

  const [Transacciones, setTransacciones] = useState([
    { id: 1, player: "Jugador 1", type: "Depósito", amount: 200, destination: "Banco" },
    { id: 2, player: "Jugador 2", type: "Transferencia", amount: 150, destination: "Jugador 3" },
    { id: 3, player: "Jugador 3", type: "Retiro", amount: 100, destination: "Efectivo" },
  ]);

  const handleBank = () => {
    
    navigate("/Banco");

  };

  return (
    <div className="flex flex-col items-center justify-center min-h">
      <div className="p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-orange-500 text-3xl font-bold drop-shadow-lg mb-4">
          Historial de Transacciones
        </h2>

        {/* Tabla de historial de transacciones */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-gray-200 rounded-md shadow-md">
            <thead>
              <tr className="bg-gray-300 text-gray-700">
                <th className="p-2">Jugador</th>
                <th className="p-2">Tipo</th>
                <th className="p-2">Valor</th>
                <th className="p-2">Destino</th>
              </tr>
            </thead>
            <tbody>
              {Transacciones.map((Transacciones) => (
                <tr key={Transacciones.id} className="border-b">
                  <td className="p-2">{Transacciones.player}</td>
                  <td className="p-2">{Transacciones.type}</td>
                  <td className="p-2 font-bold text-green-600">${Transacciones.amount}</td>
                  <td className="p-2">{Transacciones.destination}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botón para volver al banco */}
        <button onClick={() => handleBank()}
        className="mt-4 w-full p-3 text-lg rounded-md bg-blue-500 text-white hover:bg-blue-600 transition shadow-md">
          Volver al Banco
        </button>
      </div>
    </div>
  );
}
