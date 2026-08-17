import { Link } from "react-router-dom";
import FbrlSection from "../components/FbrlSection";
import Contact from "../components/Contact";
import "./ProjectPage.css";

export default function NowPage() {
  return (
    <>
      <div className="container project-page-crumb">
        <Link to="/">← 홈으로</Link>
      </div>
      <FbrlSection />
      <Contact />
    </>
  );
}
