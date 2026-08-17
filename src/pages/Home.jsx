import Hero from "../components/Hero";
import AboutTeaser from "../components/AboutTeaser";
import Skills from "../components/Skills";
import ProjectsPreview from "../components/ProjectsPreview";
import FbrlSection from "../components/FbrlSection";
import StudyPreview from "../components/StudyPreview";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <Skills />
      <ProjectsPreview />
      <FbrlSection />
      <StudyPreview />
      <Contact />
    </>
  );
}
