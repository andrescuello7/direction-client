import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerInterno">
        <p className="text-center mt-3">
          &copy;{new Date().getFullYear()} Todos los derechos reservados |{" "}
          <b className="text-primary">All right reserved</b> | Terms Of Service
        </p>
      </div>
    </div>
  );
};
export default Footer;
