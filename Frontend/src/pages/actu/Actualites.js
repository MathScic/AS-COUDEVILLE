import React, { useEffect, useState } from "react";
import ActuCards from "../../components/actualites/ActuCards";
import Classement from "../../components/classement/Classement";
import "./Actualites.scss";

const Actualites = () => {
  const [actualites, setActualites] = useState([]); // Liste de toutes les actualités
  const [loading, setLoading] = useState(true); // État de chargement
  const [visibleCount, setVisibleCount] = useState(4); // Limite à 4 cartes visibles par défaut

  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/news-actus?populate=images"
        ); // Remplace l'URL par celle de ton CMS
        const data = await response.json();

        // Trier les actualités par date (de la plus récente à la plus ancienne)
        const sortedActualites = data.actualites.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setActualites(sortedActualites); // On met à jour les actualités
        setLoading(false); // Fin du chargement
      } catch (error) {
        console.error("Erreur de récupération des actualités", error);
        setLoading(false); // Fin du chargement
      }
    };

    fetchActualites(); // Récupérer les actualités depuis l'API
  }, []);

  // Fonction pour afficher plus de cartes
  const handleShowMore = () => {
    setVisibleCount(visibleCount + 1); // Afficher une carte supplémentaire (la 5ème)
  };

  // Fonction pour afficher moins de cartes
  const handleShowLess = () => {
    setVisibleCount(4); // Revenir à 4 cartes visibles
  };

  if (loading) {
    return <div>Chargement...</div>; // Affichage pendant le chargement
  }

  // Sélectionner les cartes à afficher selon visibleCount
  const actualitesToDisplay = actualites.slice(0, visibleCount);

  return (
    <div className="actualites-container">
      <h1>Actualités</h1>
      <p>
        Suivez les résultats de nos 🟡🔵, ainsi que nos évènements tout au cours
        de l'année. <br />
        Vous retrouverez toutes les annonces de l'AS Coudeville.
      </p>
      <div className="content">
        <div className="actu-cards-container">
          {/* Afficher les cartes sélectionnées */}
          <ActuCards actualites={actualitesToDisplay} />

          {/* Affichage du bouton Voir plus/voir moins */}
          {actualites.length > 4 && (
            <div className="voir-plus-button">
              {visibleCount > 4 ? (
                <button onClick={handleShowLess}>Voir moins</button>
              ) : (
                <button onClick={handleShowMore}>Voir plus</button>
              )}
            </div>
          )}
        </div>
        <div className="classement-container">
          <Classement />
        </div>
      </div>
    </div>
  );
};

export default Actualites;
