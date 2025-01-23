import React, { useEffect, useState } from "react";
import "./ActuCards.scss"; // Assurez-vous d'importer le fichier SCSS

const ActuCards = () => {
  const [posts, setPosts] = useState(null); // Articles récupérés
  const [error, setError] = useState(null); // Gestion des erreurs
  const [expandedPost, setExpandedPost] = useState(null); // État pour la carte agrandie
  const [showMore, setShowMore] = useState(false); // Pour gérer l'affichage de la 5ème carte

  useEffect(() => {
    // Appel à l'API Strapi avec la nouvelle route 'news'
    fetch("http://localhost:1337/api/news?populate=images")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! Status : ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Données récupérées :", data); // Affiche les données récupérées
        if (data && data.data && Array.isArray(data.data)) {
          setPosts(data.data); // Stocke directement le tableau des articles
        } else {
          setPosts([]); // Sinon, on met un tableau vide
        }
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des données :", error);
        setError(error.message);
      });
  }, []);

  const handleCardClick = (post) => {
    setExpandedPost(post); // Affiche la carte agrandie
  };

  const handleOverlayClick = () => {
    setExpandedPost(null); // Ferme la carte agrandie
  };

  const handleShowMoreClick = () => {
    setShowMore(true); // Affiche la 5ème carte
  };

  const handleShowLessClick = () => {
    setShowMore(false); // Retourne à l'affichage des 4 premières cartes
  };

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (!posts || !Array.isArray(posts)) {
    return <p>Chargement en cours ou aucun article trouvé.</p>;
  }

  return (
    <div className="actu-cards">
      <div className="cards">
        {posts.slice(0, 4).map((post) => {
          const { id, titre, description, date, images } = post; // Extraction des champs nécessaires

          console.log(images); // Affiche les données des images

          // Vérification si l'image est présente et obtention de l'URL complète
          const imageUrl =
            images && images.length > 0
              ? `http://localhost:1337${images[0].url}`
              : null;

          return (
            <div
              key={id}
              className="card-container"
              onClick={() => handleCardClick(post)} // Ajoute un événement de clic sur chaque carte
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={titre || "Image"}
                  className="card-image"
                />
              ) : (
                <p style={{ color: 'red' }}>Erreur : Image non disponible</p>
              )}
              <h2>{titre || "Titre non défini"}</h2>
              <p>{description || "Description non définie"}</p>
              <div className="card-date">
                {date
                  ? new Date(date).toLocaleDateString()
                  : "Date non définie"}
              </div>
            </div>
          );
        })}

        {/* Affiche la 5ème carte si le bouton "Voir plus" est cliqué */}
        {showMore && posts.length >= 5 && (
          <div className="card-container">
            {posts[4].images && posts[4].images.length > 0 ? (
              <img
                src={`http://localhost:1337${posts[4].images[0].url}`}
                alt={posts[4].titre}
                className="card-image"
              />
            ) : (
              <p style={{ color: 'red' }}>Erreur : Image non disponible</p>
            )}
            <h2>{posts[4].titre || "Titre non défini"}</h2>
            <p>{posts[4].description || "Description non définie"}</p>
            <div className="card-date">
              {posts[4].date
                ? new Date(posts[4].date).toLocaleDateString()
                : "Date non définie"}
            </div>
          </div>
        )}
      </div>

      {/* Bouton pour voir plus ou moins */}
      {posts.length > 4 && (
        <button
          className="showmore-btn"
          onClick={showMore ? handleShowLessClick : handleShowMoreClick}
        >
          {showMore ? "Voir moins" : "Voir plus"}
        </button>
      )}

      {/* Overlay pour afficher la carte agrandie */}
      {expandedPost && (
        <div className="overlay" onClick={handleOverlayClick}>
          <div
            className="expanded-card"
            onClick={(e) => e.stopPropagation()} // Empêche la propagation du clic sur la card
          >
            {/* Image agrandie */}
            {expandedPost.images && expandedPost.images.length > 0 ? (
              <img
                src={`http://localhost:1337${expandedPost.images[0].url}`}
                alt={expandedPost.titre}
                className="expanded-card-image"
              />
            ) : (
              <p style={{ color: 'red' }}>Erreur : Image non disponible</p>
            )}

            <h2>{expandedPost.titre}</h2>
            <p>{expandedPost.description}</p>
            <div className="card-date">
              {expandedPost.date
                ? new Date(expandedPost.date).toLocaleDateString()
                : "Date non définie"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActuCards;
