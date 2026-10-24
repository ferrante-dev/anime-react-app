import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AnimeInfo from "./pages/AnimeInfo";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />

      <div className="app__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/:id" element={<AnimeInfo />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}
