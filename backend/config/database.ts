import path from "path";

export default ({ env }) => {
  const client = env("DATABASE_CLIENT", "postgres");

  const connections = {
    postgres: {
      connection: {
        connectionString: env("DATABASE_URL"),
        host: env("DATABASE_HOST", "dpg-cu96uvhopnds73apohk0-a"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "as_db"),
        user: env("DATABASE_USERNAME", "as_db_user"),
        password: env("DATABASE_PASSWORD", "SuFneUDlkz8LQ5KjeA2Ej0KE4uB68ih8"),
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
