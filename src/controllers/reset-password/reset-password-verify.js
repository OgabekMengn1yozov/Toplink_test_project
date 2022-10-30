const { generateToken } = require("../../modules/jwt");

module.exports = async (req, res) => {
  try {
    const { users } = req.db;
    const { phone_number, code } = req.body;

    let user = await users.findOne({ where: { phone_number } });

    if (!user) throw new Error("user not found");

    if (user.dataValues.code != code) throw new Error("password error");

    const resetPasswordToken = generateToken({
      phone: phone_number,
    });

    res.status(200).json({
      ok: true,
      message: "valid code",
      reset_password: resetPasswordToken,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      ok: false,
      message: e + "",
    });
  }
};
