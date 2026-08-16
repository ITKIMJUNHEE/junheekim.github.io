import {
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiGithubactions,
  SiArgo,
  SiTraefikproxy,
  SiExpress,
  SiFastapi,
  SiPostgresql,
  SiScikitlearn,
  SiPytorch,
  SiPrometheus,
  SiGrafana,
  SiTypescript,
  SiPython,
  SiK6,
} from "react-icons/si";
import { skillGroups } from "../data/skills";
import "./Skills.css";

const ICONS = {
  Docker: SiDocker,
  k3s: SiKubernetes,
  ArgoCD: SiArgo,
  "Traefik / ingress-nginx": SiTraefikproxy,
  Terraform: SiTerraform,
  "GitHub Actions": SiGithubactions,
  "Argo Workflows": SiArgo,
  "Express + TypeScript": SiExpress,
  FastAPI: SiFastapi,
  PostgreSQL: SiPostgresql,
  "scikit-learn": SiScikitlearn,
  "PyTorch / RoBERTa": SiPytorch,
  pgvector: SiPostgresql,
  Prometheus: SiPrometheus,
  Grafana: SiGrafana,
  k6: SiK6,
  TypeScript: SiTypescript,
  Python: SiPython,
};

export default function Skills() {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <span className="section-kicker">Skills</span>
        <h2 className="section-title">기술 스택</h2>
        <p className="section-sub">
          숙련도 표시 대신, 실제 프로젝트에서 각 도구를 어디에 어떻게 썼는지를 한 줄씩 남겼습니다.
        </p>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-group card" key={group.category}>
              <h3 className="skill-group-title">{group.category}</h3>
              <ul className="skill-items">
                {group.items.map((item) => {
                  const Icon = ICONS[item.name];
                  return (
                    <li key={item.name} className="skill-item">
                      {Icon && <Icon className="skill-item-icon" aria-hidden="true" />}
                      <div className="skill-item-text">
                        <span className="skill-item-name mono">{item.name}</span>
                        <span className="skill-item-note">{item.note}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
