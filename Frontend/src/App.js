import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Actualites from "./pages/actu/Actualites";
import Contact from "./pages/contact/Contact";
import AOS from "aos";
import "aos/dist/aos.css"; // Import du CSS d'AOS
import "./App.scss";

const App = () => {
  const [isContentShort, setIsContentShort] = useState(false);
  const wrappedRef = useRef(null);

  useEffect(() => {
    // Initialiser AOS
    AOS.init({
      duration: 1000, // Durée des animations (en ms)
      offset: 50, // Décalage avant le déclenchement
      once: true, // Lancer l'animation une seule fois
    });

    const checkContentHeight = () => {
      if (wrappedRef.current) {
        const wrappedHeight = wrappedRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        setIsContentShort(wrappedHeight < windowHeight);
      }
    };

    checkContentHeight();
    window.addEventListener("resize", checkContentHeight);
    return () => window.removeEventListener("resize", checkContentHeight);
  }, []);

  return (
    <div ref={wrappedRef} className="app-wrapper">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home data-aos="fade-up" />} // Animation sur Home
          />
          <Route
            path="/actualites"
            element={<Actualites data-aos="fade-left" />} // Animation sur Actualites
          />
          <Route
            path="/contact"
            element={<Contact data-aos="fade-right" />} // Animation sur Contact
          />
        </Routes>
        <Footer isContentShort={isContentShort} />
      </Router>
    </div>
  );
};

export default App;
