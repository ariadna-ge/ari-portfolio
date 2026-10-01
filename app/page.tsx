import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PortfolioHero from "./components/sections/HomePage";
import AboutMe from "./components/sections/AboutMe";

export default function Home() {
  return (
    <>
      <Header />
      <PortfolioHero />
      <AboutMe />
      <Footer />
    </>
  );
}