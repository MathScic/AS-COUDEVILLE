module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "365d", // Garder l'utilisateur connecté pendant 1 an
      },
    },
  },
});
