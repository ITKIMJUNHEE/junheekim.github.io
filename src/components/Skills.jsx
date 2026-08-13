import { skillGroups } from "../data/skills";
import "./Skills.css";

export default function Skills() {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <span className="section-kicker">Skills</span>
        <h2 className="section-title">기술 스택</h2>
        <p className="section-sub">프로젝트를 실제로 배포·운영하며 사용한 기술들입니다.</p>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-group card" key={group.category}>
              <h3 className="skill-group-title">{group.category}</h3>
              <ul className="skill-tags">
                {group.items.map((item) => (
                  <li key={item} className="stack-tag mono">
                    {item}
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
