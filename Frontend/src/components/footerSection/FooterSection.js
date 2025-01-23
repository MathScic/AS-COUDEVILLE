import React from "react";
import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";
import "./FooterSection.scss";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <div className="footer-section">
      <section className="section-container">
        <div className="adress">
          <h2>A.S Coudeville</h2>
          <p>Stade de la plage</p>
          <p>Coudeville sur mer</p>
          <p>50290</p>
          <div className="adress-links">
            <a href="https://www.instagram.com/as_coudeville_50/">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100083204738697&locale=fr_FR%2F">
              <FaFacebook />
            </a>
            <a href="ascoudeville@outlook.com">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </section>
      <section className="section-container">
        <div className="section-img">
          <img src="/images/Logo.png" alt="Logo" />
        </div>
      </section>
      <section className="section-container">
        <h2>Liens utiles</h2>
        <Link to="/about" className="footer-links">
          A-propos
        </Link>
        <Link to="/actualites" className="footer-links">
          Actualites
        </Link>
        <Link to="/contact" className="footer-links">
          Contact
        </Link>
      </section>
    </div>
  );
};

export default FooterSection;
