import LandPage from "../components/LandPage/LandPage";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
const Home = () => {
  return (
    <div className="bodyLandPage">
      <div>
        <Navbar />
      </div>
      <div>
        <LandPage />
      </div>
      <hr className="bg-light" />
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default Home;
