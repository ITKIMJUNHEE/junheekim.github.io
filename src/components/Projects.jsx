import ProjectDetail from "./ProjectDetail";
import { projects } from "../data/projects";
import "./Projects.css";

export default function Projects() {
  return (
    <section id="projects" className="projects section">
      <div className="container">
        <span className="section-kicker">Projects</span>
        <h2 className="section-title">케이스 스터디 2개</h2>
        <p className="section-sub">
          완성도보다 실제로 무엇을 결정하고, 어디서 막혔고, 어떻게 풀었는지를 남겼습니다. 두 프로젝트 모두
          실제 리포지토리와 측정한 지표를 근거로 정리했습니다.
        </p>
        <div className="projects-list">
          {projects.map((p) => (
            <ProjectDetail key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
