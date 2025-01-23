import React, { useEffect, useState } from "react";
import "./ActuCards.scss"; // Assurez-vous d'importer le fichier SCSS

const ActuCards = () => {
  const [posts, setPosts] = useState([]); // Articles récupérés
  const [error, setError] = useState(null); // Gestion des erreurs
  const [expandedPost, setExpandedPost] = useState(null); // État pour la carte agrandie
  const [visibleCount, setVisibleCount] = useState(4); // Nombre de cartes visibles par défaut

  useEffect(() => {
    // Appel à l'API Strapi avec la bonne URL
    fetch("https://as-coudeville.onrender.com/api/news?populate=images")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! Status : ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Données récupérées :", data); // Affiche les données récupérées

        if (data && data.data && Array.isArray(data.data)) {
          const formattedPosts = data.data.map((post) => ({
            id: post.id,
            titre: post.attributes?.titre || "Titre non défini", // Chaînage sécurisé
            description:
              post.attributes?.description || "Description non définie", // Chaînage sécurisé
            date: post.attributes?.date || null, // Chaînage sécurisé
            imageUrl: post.attributes?.images?.data?.[0]?.attributes?.url
              ? `https://as-coudeville.onrender.com${post.attributes.images.data[0].attributes.url}`
              : null, // Vérifie que l'URL de l'image existe
          }));
          setPosts(formattedPosts);
        } else {
          setPosts([]); // Si aucune donnée, tableau vide
        }
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des données :", error);
        setError(error.message);
      });
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 1); // Augmente le nombre visible
  };

  const handleShowLess = () => {
    setVisibleCount(4); // Réinitialise à 4 cartes
  };

  const handleCardClick = (post) => {
    setExpandedPost(post); // Affiche la carte agrandie
  };

  const handleOverlayClick = () => {
    setExpandedPost(null); // Ferme la carte agrandie
  };

  // Gestion des erreurs
  if (error) {
    return <p>Erreur : {error}</p>;
  }

  // Vérifie si les posts sont disponibles
  if (!posts.length) {
    return <p>Chargement en cours ou aucun article trouvé.</p>;
  }

  return (
    <div className="actu-cards">
      <div className="cards">
        {posts.slice(0, visibleCount).map((post) => (
          <div
            key={post.id}
            className="card-container"
            onClick={() => handleCardClick(post)} // Ajoute un événement de clic sur chaque carte
          >
            {post.imageUrl ? (
              <img
                src={post.imageUrl}
                alt={post.titre}
                className="card-image"
              />
            ) : (
              <p style={{ color: "red" }}>Erreur : Image non disponible</p>
            )}
            <h2>{post.titre}</h2>
            <p>{post.description}</p>
            <div className="card-date">
              {post.date
                ? new Date(post.date).toLocaleDateString()
                : "Date non définie"}
            </div>
          </div>
        ))}
      </div>

      {/* Bouton pour voir plus ou moins */}
      {posts.length > visibleCount && (
        <button className="showmore-btn" onClick={handleShowMore}>
          Voir plus
        </button>
      )}
      {visibleCount > 4 && (
        <button className="showmore-btn" onClick={handleShowLess}>
          Voir moins
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
            {expandedPost.imageUrl ? (
              <img
                src={expandedPost.imageUrl}
                alt={expandedPost.titre}
                className="expanded-card-image"
              />
            ) : (
              <p style={{ color: "red" }}>Erreur : Image non disponible</p>
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
