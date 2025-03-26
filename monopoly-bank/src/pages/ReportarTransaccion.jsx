import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ReporteTransacion() {
  const navigate = useNavigate();

  const [playerName, setPlayerName] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("Depósito");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Reporte enviado:", { playerName, amount, transactionType });
    try {
      const response = await axios.post("http://localhost:3000/", {
        playerName,
        amount,
        transactionType,
      });

      console.log("Reporte enviado:", response.data);

      // Alerta de éxito
      Swal.fire({
        title: "¡Transacción enviada!",
        text: "Se ha registrado la transacción correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      // Limpiar formulario
      setPlayerName("");
      setAmount("");
      setTransactionType("Depósito");
    } catch (error) {
      console.error("Error al enviar la transacción:", error);

      // Alerta de error
      Swal.fire({
        title: "Error",
        text: "No se pudo registrar la transacción. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  
  };

  const handleVolver = () => {
    navigate("/Banco");
  };

  return (
    
      <div className="p-6 bg-white rounded-lg shadow-lg w-90 text-center mt-5">
        <h2 className="text-orange-500 text-3xl font-bold drop-shadow-lg mb-4">
          Reportar Transacción
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre del Jugador */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Nombre del Jugador (Destino) </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full p-3 text-lg rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Monto */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Monto</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 text-lg rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Tipo de Transacción */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Tipo de Transacción</label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="w-full p-3 text-lg rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="Depósito">Multa o Impuesto</option>
              <option value="Retiro">Pagar alquiler</option>
              <option value="Transferencia">Salir de la carcel</option>
            </select>
          </div>

          {/* Botón de Enviar */}
          <button
            type="submit"
            className="w-full p-3 text-lg rounded-md bg-green-500 text-white  hover:bg-green-600 transition shadow-md"
          >
            Enviar
          </button>
        </form>

        {/* Botón para Volver */}
        <button onClick={() => handleVolver()}
        className="mt-4 w-full p-3 text-lg rounded-md bg-gray-500 text-white  hover:bg-gray-600 transition shadow-md">
          Volver
        </button>
      </div>
    
  );
}
