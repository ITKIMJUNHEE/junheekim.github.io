import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import SiteNav from "./components/SiteNav";
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import ProjectPage from "./pages/ProjectPage";
import StudyPage from "./pages/StudyPage";
import Perspective from "./pages/Perspective";

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
          <Route path="/perspective" element={<Perspective />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
