require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getSslDialectOptions() {
  if (!isProduction) {
    return {};
  }

  if (process.env.DB_SSL === "false") {
    return {};
  }

  return {
    ssl: {
      require: true,
      rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false",
    },
  };
}

function createConfig(databaseName) {
  return {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: databaseName,
    host: process.env.DB_HOST,
    port: toNumber(process.env.DB_PORT, 3306),
    dialect: process.env.DB_DIALECT || "mysql",
    logging: process.env.DB_LOGGING === "true",
    dialectOptions: {
      connectTimeout: toNumber(process.env.DB_CONNECT_TIMEOUT_MS, 10000),
      ...getSslDialectOptions(),
    },
    pool: {
      max: toNumber(process.env.DB_POOL_MAX, 10),
      min: toNumber(process.env.DB_POOL_MIN, 0),
      acquire: toNumber(process.env.DB_POOL_ACQUIRE_MS, 30000),
      idle: toNumber(process.env.DB_POOL_IDLE_MS, 10000),
    },
    retry: {
      max: toNumber(process.env.DB_RETRY_MAX, isProduction ? 3 : 1),
    },
  };
}

module.exports = {
  development: createConfig(process.env.DB_NAME_DEV),
  test: createConfig(process.env.DB_NAME_TEST),
  production: createConfig(process.env.DB_NAME_PROD),
};
