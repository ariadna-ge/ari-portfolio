import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PortfolioHero from "./components/sections/HomePage";
import AboutMe from "./components/sections/AboutMe";
import ContactMe from "./components/sections/ContactMe";
import Skills from "./components/sections/Skills";
import ProjectsMagazine from "./components/sections/ProjectsMagazine";
import { projects } from "./data/projects";

export default function Home() {
  return (
    <>
      <Header />
      <PortfolioHero />
      <AboutMe />
      <Skills />
      <ProjectsMagazine projects={projects} />
      <ContactMe />
      <Footer />
    </>
  );
}