import { useNavigate } from "react-router-dom";

export default function GameLobby() {
  const navigate = useNavigate();

  return (
    <div
      
    >
      {/* Fondo borroso */}

      <div >
        <h1 className="text-orange-500 text-center text-[40px] font-bold shadow-md mt-10 drop-shadow-[2px_2px_10px_rgba(255,255,255,1)]">
          Partidas
        </h1>

        <div className="space-y-6 mt-6 m-4">
          {/* Botón Unirse */}
          <button
            onClick={() => navigate("/Login_partida")}
            className="w-full font-[Oswald] font-extrabold py-3 text-[22px] rounded-lg border-none bg-white text-black shadow-lg hover:bg-gray-400 transition"
          >
            Unirse a una Partida
          </button>

          {/* Botón Crear */}
          <button
            onClick={() => navigate("/Lobby_master")}
            className="w-full font-[Oswald] font-extrabold py-3 text-[22px] rounded-lg border-none bg-white text-black shadow-lg hover:bg-gray-400 transition"
          >
            Crear una Partida
          </button>
        </div>
      </div>
    </div>
  );
}

