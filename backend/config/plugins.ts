module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "365d", // Garde l'utilisateur connecté pendant un an
      },
    },
  },
});
