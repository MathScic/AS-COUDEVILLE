export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("RENDER_EXTERNAL_URL"), // Ajout de l'URL publique
  proxy: true, // Activation du proxy
  app: {
    keys: env.array("APP_KEYS"),
  },
});
