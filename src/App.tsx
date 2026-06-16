import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Home } from "@/pages/Home";
import { TutorProfile } from "@/pages/TutorProfile";
import { BecomeMentor } from "@/pages/BecomeMentor";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentor/:slug" element={<TutorProfile />} />
          <Route path="/quiero-ser-mentor" element={<BecomeMentor />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
