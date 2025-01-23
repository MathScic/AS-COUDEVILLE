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
          "https://as-coudeville.onrender.com/api/news?populate=images" // Ajoute `populate=images` pour récupérer les images
        );
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const result = await response.json();

        // Récupérer les actualités depuis "data"
        const actualitesData = result.data.map((item) => ({
          id: item.id,
          titre: item.attributes.titre,
          description: item.attributes.description,
          date: item.attributes.date,
          createdAt: item.attributes.createdAt,
          imageUrl: item.attributes.images?.data?.[0]?.attributes?.url
            ? `https://as-coudeville.onrender.com${item.attributes.images.data[0].attributes.url}`
            : null, // Récupérer l'URL de l'image
        }));

        // Trier par date de création (createdAt)
        const sortedActualites = actualitesData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setActualites(sortedActualites); // Mettre à jour l'état avec les actualités triées
      } catch (error) {
        console.error("Erreur lors du chargement des actualités :", error);
      } finally {
        setLoading(false); // Terminer le chargement
      }
    };

    fetchActualites();
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
          {/* Passer les actualités triées au composant ActuCards */}
          <ActuCards actualites={actualitesToDisplay} />

          {/* Boutons pour afficher plus ou moins */}
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
