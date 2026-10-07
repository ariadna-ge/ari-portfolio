import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PortfolioHero from "./components/sections/HomePage";
import AboutMe from "./components/sections/AboutMe";
import ContactMe from "./components/sections/ContactMe";
import Skills from "./components/sections/Skills";

export default function Home() {
  return (
    <>
      <Header />
      <PortfolioHero />
      <AboutMe />
      <Skills />
      <ContactMe />
      <Footer />
    </>
  );
}