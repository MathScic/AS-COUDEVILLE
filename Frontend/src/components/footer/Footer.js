import React from "react";
import "./Footer.scss";
import FooterSection from "../footerSection/FooterSection";

const Footer = ({ isContentShort }) => {
  return (
    <footer
      className={`footer ${
        isContentShort ? "fixed-footer" : "relative-footer"
      }`}
    >
      <FooterSection />
    </footer>
  );
};

export default Footer;
