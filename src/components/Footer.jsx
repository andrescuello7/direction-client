import React from 'react'

export default function footer() {
    return (
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4> Datos Personales</h4>
                        <ul className="list-unstyled">
                        <li>Desarrollador Full Stack</li>
                            <li>Tucuman, Argentina</li>
                            <li>Pasaje Houssay 3413</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4> Redes Sociales</h4>
                        <ul className="list-unstyled">
                            <li><a href="https://www.instagram.com/4ndres_cuello/?hl=es-la"><i class="fab fa-instagram"></i></a> 4ndres_cuello</li>
                            <li><a href="https://www.facebook.com/andres.cuello.14"><i class="fab fa-facebook-f"></i></a> Andres Cuello</li>
                            <li><a href="https://github.com/andrescuello7"><i class="fab fa-github"></i></a> andrescuello7</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4> Contactanos</h4>
                        <ul className="list-unstyled">
                            <li>Tel: 381-5615474</li>
                            <li>Estudiante de Rolling Code Scohol</li>
                            <li>Email: andrescuellotrabajo@gmail.com</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} THICC MEMES INC | All right reserved | Terms Of Service
                    </p>
                </div>
            </div>
        </div>
    )
}
