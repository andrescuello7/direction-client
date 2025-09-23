import React from "react";
import "./Landing.css";

function Landing() {
  const redirect = () => {
    window.location.href = "/login";
  };

  return (
    <div className="landing">
      <div className="app">
        <section className="hero">
          <div className="text-center PortadaTitulo">Lugar Secreto</div>
          <br />
          <h1>
            Directorio para Congregaciones
            <br /> Buscamos Equilibrio entre nosotros
          </h1>
          <p className="d-flex flex-wrap w-50">
            Este es un espacio que fue creado con el fin de podes traer orden a
            las tareas cotidianas de las congraciones para reducir tiempos de
            organizacion y utilizarlo para el Señor
          </p>
          <div className="hero-form w-100 d-flex">
            <button onClick={redirect} className="green">
              Empezar Ahora
            </button>
            <button className="white">Informacion</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Landing;
