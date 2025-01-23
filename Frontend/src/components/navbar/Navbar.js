import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Import des icônes

const Navbar = () => {
  const location = useLocation(); // Récupère le chemin actuel
  const isHomePage = location.pathname === "/"; // Vérifie si on est sur la page d'accueil

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);

  // Fonction pour gérer l'ouverture/fermeture du menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        // Si on défile à plus de 100px
        setIsTransparent(false);
      } else {
        setIsTransparent(true);
      }
    };

    // Ajout de l'événement de défilement
    window.addEventListener("scroll", handleScroll);

    // Nettoyage de l'événement lors du démontage du composant
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Le tableau vide [] signifie que cet effet s'exécute uniquement au montage/démontage

  return (
    <div
      className={`navbar-container ${
        isHomePage && isTransparent ? "transparent" : "opaque"
      }`}
    >
      <div className="navbar">
        {/* Logo */}
        <NavLink to="/" className="navbar-links">
          <img src="/images/Logo.png" alt="Logo du club" className="logo" />
        </NavLink>

        {/* Menu classique (desktop) */}
        <div className={`navbar-links-container ${isMenuOpen ? "open" : ""}`}>
          <NavLink
            to="/"
            className="navbar-links"
            onClick={() => setIsMenuOpen(false)}
          >
            Accueil
          </NavLink>
          <NavLink
            to="/actualites"
            className="navbar-links"
            onClick={() => setIsMenuOpen(false)}
          >
            Actualités
          </NavLink>
          <NavLink
            to="/contact"
            className="navbar-links"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>
        </div>

        {/* Icône du menu burger (mobile) */}
        <div className="burger-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
