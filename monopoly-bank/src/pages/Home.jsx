import React from "react";
import '../styles/index.css'
import '../styles/Home.css'
import { useNavigate } from "react-router-dom";


function Home(){
    const navigate = useNavigate();

    return(
        <>
            <div id="container_btn">
                <button id="btn_inSesion" className="btn-mb" onClick={()=> navigate("/Inicio_Sesion")} >Iniciar Sesión</button>
                <button id="btn_registrar" className="btn-mb" onClick={()=> navigate("/Registro")} >Registrarse</button>
            </div>
        </>
    )
}

export default Home;