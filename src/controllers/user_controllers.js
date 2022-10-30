const { generateHash, compareHash } = require("../modules/bcrypt");
const { generateToken } = require("../modules/jwt");

module.exports = class Users {
  static async SignUp(req, res) {
    try {
      const { users } = req.db;
      const { full_name, phone_number, email, password, username } = req.body;

      let user = await users.findOne({ where: { phone_number } });
      if (user) throw new Error("phone number already registered");
      user = await users.findOne({ where: { email } });
      if (user) throw new Error("email already registered");
      user = await users.findOne({ where: { username } });
      if (user) throw new Error("username already registered");

      let hash = await generateHash(password);

      user = await users.create({
        full_name,
        phone_number,
        email,
        password: hash,
        username,
      });

      let token = generateToken({
        ...user.dataValues,
        password: undefined,
      });

      res.status(201).json({
        ok: true,
        message: "user created",
        data: {
          token,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        ok: false,
        message: e + "",
      });
    }
  }

  static async Login(req, res) {
    try {
      const { email, password } = req.body;
      const { users } = req.db;

      let user = await users.findOne({ where: { email } });

      if (!user) throw new Error("email is not registered");

      let isPasswordTrue = await compareHash(password, user.dataValues.password);

      if (!isPasswordTrue) throw new Error("invalid password");

      let token = await generateToken({
        ...user.dataValues,
        password: undefined,
        code: undefined,
      });

      res.status(200).json({
        ok: true,
        message: "login succes",
        data: {
          token,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        ok: false,
        message: e + "",
      });
    }
  }
};
