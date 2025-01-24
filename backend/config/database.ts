import path from "path";

export default ({ env }) => {
  const client = env("DATABASE_CLIENT", "postgres"); // Utiliser "postgres"

  const connections = {
    postgres: {
      connection: {
        connectionString: env("DATABASE_URL"), // Utiliser la variable d'environnement DATABASE_URL
        ssl: env.bool("DATABASE_SSL", true) && {
          rejectUnauthorized: env.bool(
            "DATABASE_SSL_REJECT_UNAUTHORIZED",
            false
          ),
        },
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
