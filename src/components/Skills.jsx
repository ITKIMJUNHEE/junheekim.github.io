import { skillGroups } from "../data/skills";
import "./Skills.css";

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
                {group.items.map((item) => (
                  <li key={item.name} className="skill-item">
                    <span className="skill-item-name mono">{item.name}</span>
                    <span className="skill-item-note">{item.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
