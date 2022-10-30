module.exports.Users = async (Sequelize, sequelize) => {
  return sequelize.define("users", {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
    },
    full_name: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.DataTypes.STRING(12),
      is: /^998[389][01345789][0-9]{7}$/,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING(64),
      is: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      allowNull: false,
    },
    username: {
      type: Sequelize.DataTypes.STRING(128),
    },
    password: {
      type: Sequelize.DataTypes.STRING,
    },
    code: {
      type: Sequelize.DataTypes.STRING(128),
    },
  });
};
