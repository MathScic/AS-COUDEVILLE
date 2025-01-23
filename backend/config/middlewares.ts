export default ({ env }) => [
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
      headers: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  {
    name: "strapi::session",
    config: {
      enabled: true,
      client: "cookie",
      key: "strapi.sid",
      secret: env("SESSION_SECRET", "someRandomSecretKey"),
      cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000, // Durée : 1 an
        secure: env.bool("SESSION_COOKIE_SECURE", false), // "true" si HTTPS obligatoire
        httpOnly: true,
        path: "/",
        sameSite: "lax",
      },
    },
  },
  "strapi::favicon",
  "strapi::public",
];
