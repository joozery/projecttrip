import Hero from "../components/Hero/Hero"; // ✅ Import Hero Section
import About from "../components/About/About"; // ✅ Import About Section
import CountryCarousel from "../components/CountryCarousel";
import ImageGallery from "../components/Gallery";
import ReviewFacebook from "../components/ReviewFacebook";
import BeginTrip from "../components/Begin-Trip";
import FAQ from "../components/Q&A";
import Partner from "../components/Partner";

const Home = () => {
  return (
    <div className="min-h-screen space-y-20">
      <Hero />
      <Partner/>
      <ImageGallery />
      <BeginTrip />

    </div>
  );
};

export default Home;
