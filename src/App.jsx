import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import SiteNav from "./components/SiteNav";
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import ProjectPage from "./pages/ProjectPage";
import StudyPage from "./pages/StudyPage";
import ProposalsPage from "./pages/Proposals";
import WorkingStylePage from "./pages/WorkingStyle";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SiteNav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="/proposals" element={<ProposalsPage />} />
          <Route path="/working-style" element={<WorkingStylePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
