import React, { useEffect, useState } from "react";
import Banner from "../../components/banner/Banner";
import ActuCards from "../../components/actualites/ActuCards";
import "./Home.scss";
import ContactForm from "../../components/contactForm/ContactForm";
import About from "../../components/about/About";
import Classement from "../../components/classement/Classement";

import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [actualites, setActualites] = useState([]); // Liste des actualités
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs

  useEffect(() => {
    // Initialisation d'AOS pour gérer les animations
    AOS.init({
      duration: 1000, // Durée des animations
      once: true, // Une seule fois par chargement
      offset: 150, // Décalage pour déclencher l'animation au scroll
    });

    // Récupérer les actualités depuis l'API déployée sur Render
    fetch("https://as-coudeville.onrender.com/api/news") // Nouvelle URL correcte
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.data) {
          // Trier les actualités par date décroissante
          const sortedActualites = data.data
            .map((item) => ({
              id: item.id,
              titre: item.titre,
              description: item.description,
              date: item.date,
              imageUrl: item.imageUrl || "", // Vérifie si une image est présente
            }))
            .sort((a, b) => new Date(b.date) - new Date(a.date));

          // Limiter à 4 actualités les plus récentes
          const limitedActualites = sortedActualites.slice(0, 4);

          setActualites(limitedActualites);
        } else {
          setActualites([]);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des actualités :", error);
        setError("Impossible de charger les actualités. Veuillez réessayer.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // L'appel API s'effectue seulement au montage du composant

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>; // Affichage du message d'erreur
  }

  return (
    <div className="home-container">
      {/* La bannière et la section "À propos" s’animent au chargement de la page */}
      <div data-aos="fade-down">
        <Banner />
      </div>
      <div data-aos="fade-up">
        <About />
      </div>

      {/* Les actualités s’animent au moment du scroll */}
      <div
        className="actualite-home"
        data-aos="fade-right"
        data-aos-offset="200"
      >
        <h1>Les Actu's</h1>
        <div className="actu-form">
          <div className="compo-actu">
            {/* Passer les actualités récupérées à ActuCards */}
            <ActuCards actualites={actualites} />
          </div>
          <div className="class-actu">
            <Classement />
          </div>
        </div>
        <a href="/actualites" className="home-links">
          <h3>Toutes les actu's</h3>
        </a>
      </div>

      {/* ContactForm s’anime au moment du scroll */}
      <div data-aos="fade-up" data-aos-offset="300">
        <ContactForm />
      </div>
    </div>
  );
};

export default Home;
