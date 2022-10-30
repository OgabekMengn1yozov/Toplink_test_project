const { generateHash } = require("../../modules/bcrypt");
const { generateToken, checkToken } = require("../../modules/jwt");

module.exports = async (req, res) => {
  try {
    const { users } = req.db;
    let { password, repeatedPassword } = req.body;
    let { reset_password } = req.headers;

    if (password != repeatedPassword)
      throw new Error("no two passwords are the same");

    let { phone } = await checkToken(reset_password);

    let user = await users.update(
      {
        password: await generateHash(password),
        code: null,
      },
      {
        where: { phone_number: phone },
      }
    );

    token = await generateToken({
      ...user.dataValues,
      password: undefined,
    });

    res.status(200).json({
      ok: true,
      message: "password changed",
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      ok: false,
      message: e + "",
    });
  }
};
