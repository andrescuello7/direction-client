import UseHome from "../../UseForm/UseHome";

const Precentacion = () => {
  //Declaracion de datos traidos de Hook Home y Token de LocalStorage
  const { usuario } = UseHome();

  return (
    <div className="landPageOrden">
      <div className="perfil">
        <div className="FotoDePerfil">
          <img
            variant="top"
            className="foto"
            src="https://instagram.ftuc4-1.fna.fbcdn.net/v/t51.2885-15/e35/49616204_1184665255031219_7788414165813092270_n.jpg?tp=1&_nc_ht=instagram.ftuc4-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=5TNSjRSLcVQAX_WNFca&edm=AP_V10EAAAAA&ccb=7-4&oh=a829ddab58052450c6da00378f8a0888&oe=609D3006&_nc_sid=4f375e"
          />
        </div>
        <div>
          <div className="w-100 text-center mt-2">
            <b>
              <i>{usuario.usuario}</i>
            </b>
          </div>
          <div className="text-center mt-2">
            <ul className="list-unstyled">
              <li>
                <a href="https://www.instagram.com/4ndres_cuello/">
                  <i class="fab fa-instagram p-2"></i>
                </a>
                4ndres_cuello
              </li>
              <li>
                <a href="https://www.facebook.com/andres.cuello.14/">
                  <i class="fab fa-facebook-f p-2"></i>
                </a>
                Andres Cuello
              </li>
              <li>
                <a href="https://www.linkedin.com/in/silvio-andres-cuello-a9a1b11bb/">
                  <i class="fab fa-linkedin p-2"></i>
                </a>
                Andres Cuello
              </li>
              <li>
                <a href="https://github.com/andrescuello7">
                  <i class="fab fa-github p-2"></i>
                </a>
                andrescuello7
              </li>
            </ul>
            <hr className="bg-light" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Precentacion;
