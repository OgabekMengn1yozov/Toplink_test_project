const { Sequelize } = require("sequelize");
const { DB_URL } = require("../../config");
const { Users } = require("./models");

const sequelize = new Sequelize(DB_URL, {
  logging: false,
});

module.exports = async function () {
  try {
    const db = {};

    // models
    db.users = await Users(Sequelize, sequelize);

    sequelize.sync({ force: false });
    return db;
  } catch (e) {
    console.log("DB ERROR", e);
  }
};
