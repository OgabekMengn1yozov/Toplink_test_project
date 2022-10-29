require("dotenv").config();

const { env } = process;

module.exports = {
  DB_URL: env.DB_URL,
  PORT: env.PORT,
};
