import React from "react";
import "./Banner.scss"; // Assurez-vous que le CSS est importé

const Banner = () => {
  return (
    <div className="banner-container">
      <img src="/images/Banner.png" alt="Banner" className="banner-image" />
      <div className="banner-text">
        <h2>
          Bienvenue à l'<strong className="banner_as">A.S</strong>{" "}
          <strong className="banner-coudeville">Coudeville</strong>
        </h2>
        <p>
          Rejoignez-nous pour une aventure sportive chaleureuse et pleine de
          passion !
        </p>
      </div>
    </div>
  );
};

export default Banner;
