require("dotenv").config();

const { env } = process;

module.exports = {
  DB_URL: env.DB_URL,
  PORT: env.PORT,
  SECRET_WORD: env.SECRET_WORD,
  PASSWORD: env.PASSWORD,
  EMAIL: env.EMAIL,
};
