import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";
import "./Projects.css";

export default function Projects() {
  return (
    <section id="projects" className="projects section">
      <div className="container">
        <span className="section-kicker">Projects</span>
        <h2 className="section-title">순서가 아니라 상태로 구분한 프로젝트</h2>
        <p className="section-sub">
          완성/미완성이 아니라 지금 어떤 상태에 있는지로 프로젝트를 정리했습니다. 카드마다 실제 리포지토리와
          측정한 지표를 함께 남겼습니다.
        </p>
        <div className="projects-list">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
