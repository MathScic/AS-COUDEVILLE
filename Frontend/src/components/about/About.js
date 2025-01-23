import React from "react";
import "./About.scss";
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <div className="about-container">
      <h1>A-Propos du club</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
        mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla.
      </p>
      <button className="about-contact-button">
        <NavLink to="/contact">Contactez-nous</NavLink>
      </button>
    </div>
  );
};

export default About;
