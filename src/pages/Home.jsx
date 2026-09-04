import Hero from "../components/Hero";
import ProofStrip from "../components/ProofStrip";
import AboutTeaser from "../components/AboutTeaser";
import ProjectsPreview from "../components/ProjectsPreview";
import Skills from "../components/Skills";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <AboutTeaser />
      <ProjectsPreview />
      <Skills />
      <Contact />
    </>
  );
}
