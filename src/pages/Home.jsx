import Hero from "../components/Hero";
import Timeline from "../components/Timeline";
import ProofStrip from "../components/ProofStrip";
import AboutTeaser from "../components/AboutTeaser";
import ProjectsPreview from "../components/ProjectsPreview";
import ProposalsTeaser from "../components/ProposalsTeaser";
import WorkingStyleTeaser from "../components/WorkingStyleTeaser";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Timeline />
      <ProofStrip />
      <AboutTeaser />
      <ProjectsPreview />
      <ProposalsTeaser />
      <WorkingStyleTeaser />
      <Contact />
    </>
  );
}
