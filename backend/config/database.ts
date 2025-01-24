import path from "path";

export default ({ env }) => {
  const client = env("DATABASE_CLIENT", "postgres"); // On passe ici à "postgres"

  const connections = {
    postgres: {
      connection: {
        connectionString: env("DATABASE_URL"), // Utilisation de la variable d'environnement DATABASE_URL
        host: env(
          "DATABASE_HOST",
          "dpg-cu9mv5lsvqrc73dhpp3g-a.frankfurt-postgres.render.com"
        ), // Hôte de Render
        port: env.int("DATABASE_PORT", 5432), // Port PostgreSQL
        database: env("DATABASE_NAME", "as_db_2ubx"), // Nom de la base de données sur Render
        user: env("DATABASE_USERNAME", "as_db_2ubx_user"), // Utilisateur PostgreSQL sur Render
        password: env("DATABASE_PASSWORD", "ovXKSw12lO6RQ1RNbNmgCeYLgp5kH1ok"), // Mot de passe PostgreSQL
        ssl: env.bool("DATABASE_SSL", true) && {
          rejectUnauthorized: env.bool(
            "DATABASE_SSL_REJECT_UNAUTHORIZED",
            false
          ),
        },
        schema: env("DATABASE_SCHEMA", "public"),
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          "..",
          env("DATABASE_FILENAME", ".tmp/data.db")
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
