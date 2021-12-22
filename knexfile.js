// DO NOT CHANGE THIS FILE
const sharedConfig = {
  client: "pg",
  useNullAsDefault: true,
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },
  // this enables foreign keys in SQLite
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    },
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: { filename: "./data/auth.db3" },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: "./data/testing.db3" },
  },
  production: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    }
  },
};
