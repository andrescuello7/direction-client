const Footer = () => {
    return (
        <div className="footerAuto p-2">
            <hr className="bg-light" />
            <div className="Footer">
                <div className="main-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <h4>
                                    <b>
                                        <i>Datos Personales</i>
                                    </b>
                                </h4>
                                <ul className="list-unstyled">
                                    <li>Desarrollador Full Stack</li>
                                    <li>Tucuman, Argentina</li>
                                    <li>Pasaje Houssay 3413</li>
                                </ul>
                            </div>
                            <div className="col text-center">
                                <h4 className="">
                                    <b>
                                        <i>Redes Sociales</i>
                                    </b>
                                </h4>
                                <div className="m-0">
                                    <ul className="list-unstyled">
                                        <li>
                                            <a href="https://www.instagram.com">
                                                <i class="fab fa-instagram p-2"></i>
                                            </a>
                                            Imm_empress
                                        </li>
                                        <li>
                                            <a href="https://www.facebook.com">
                                                <i class="fab fa-facebook-f p-2"></i>
                                            </a>
                                            Imm_empress
                                        </li>
                                        <li>
                                            <a href="https://github.com">
                                                <i class="fab fa-github p-2"></i>
                                            </a>
                                            Imm_emprese
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col text-center">
                                <h4>
                                    <b>
                                        <i>Contactanos</i>
                                    </b>
                                </h4>
                                <ul className="list-unstyled">
                                    <div className="">
                                        <li>Tel: 381-5615474</li>
                                        <li>Estudiante de Rolling Code Scohol</li>
                                        <li>Email: andrescuellotrabajo@gmail.com</li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <p className="col-sm text-center">
                                &copy;{new Date().getFullYear()} THICC MEMES INC | All right reserved | Terms
                                Of Service
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Footer;
