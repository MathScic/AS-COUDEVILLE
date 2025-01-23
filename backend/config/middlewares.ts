export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: [
        "https://as-coudeville-b4e0f.web.app", // Frontend Firebase
        "http://localhost:3000", // Frontend local pour le développement
      ],
      headers: "*", // Permet tous les en-têtes, personnalise si besoin
      methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes HTTP autorisées
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
