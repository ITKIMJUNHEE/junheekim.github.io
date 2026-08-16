import { useParams, Link, Navigate } from "react-router-dom";
import ProjectDetail from "../components/ProjectDetail";
import Contact from "../components/Contact";
import { projects } from "../data/projects";
import "./ProjectPage.css";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.id === slug);

  if (!project) return <Navigate to="/" replace />;

  return (
    <>
      <div className="container project-page-crumb">
        <Link to="/">← 홈으로</Link>
      </div>
      <section className="project-page section">
        <div className="container">
          <ProjectDetail project={project} />
        </div>
      </section>
      <Contact />
    </>
  );
}
