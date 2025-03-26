import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Header from './components/Header.jsx'
import Home from './pages/Home.jsx';
import Login from './pages/InicioSesion.jsx';
import Register from './pages/Registrarse.jsx';
import GameLobby from './pages/DosOpciones.jsx';
import Lobby from './pages/InicioPartida.jsx';
import LobbyPlayer from './pages/EsperaPartida.jsx';
import BalanceJugadores from './pages/BankMonopoly.jsx';
import ReporteTransacion from './pages/ReportarTransaccion.jsx';
import HistorialTransacciones from './pages/HistorialTransaccion.jsx';
import LoginPartida from './pages/UnirseAPartida.jsx';


function App() {

  return (
      
    <>
      <Header/>
    
      <Router>
        <Routes>
          {/* Generales */}
          <Route path="/" element={<Home />}/>
          <Route path="/Inicio_Sesion" element={<Login />}/>
          <Route path="/Registro" element={<Register />}/>
          <Route path="/Lobby_Game" element={<GameLobby />}/> {/* Ingresar o crear partida */}
          <Route path="/Banco" element={<BalanceJugadores />}/> {/* home de la partida*/}
          <Route path="/Reportar_transaccion" element={<ReporteTransacion/>}/>
          <Route path="/Historial_transaccion" element={<HistorialTransacciones/>}/>

          {/* master */}
          <Route path="/Lobby_master" element={<Lobby />}/> {/* Lobby del master*/}

          {/* player */}
          <Route path="/Login_partida" element={<LoginPartida/>}/> {/* Unirse como jugador*/}
          <Route path="/Lobby_player" element={<LobbyPlayer />}/> {/* Lobby del jugador*/}
          
        </Routes> 
      </Router> 

      
    </>
   
  )
}

export default App
