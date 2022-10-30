const generateCode = require("../../modules/generate-code");
const { generateToken } = require("../../modules/jwt");
const sendEmail = require("../../modules/send-email");
const nodemailer = require("nodemailer");
const sms = require("../../modules/send-sms");

module.exports = async (req, res) => {
  try {
    const { users } = req.db;
    const { phone_number } = req.body;

    let user = await users.findOne({ where: { phone_number } });

    if (!user) throw new Error("email is not registered");

    const code = generateCode();

    await users.update(
      {
        code,
      },
      {
        where: {
          phone_number,
        },
      }
    );

    let response = await sms(phone_number, `Toplink tasdiqlash kodi ${code}`);

    console.log(response);

    if (response == true) {
      res.status(200).json({
        ok: true,
        message: "send code",
        phone_number,
      });
    } else {
      throw new Error(response);
    }
    // let response = await sendEmail(
    //   email,
    //   `Verification link`,
    //   "Email verification",
    //   `<p>${code}</p>`
    // );
    // const transport = nodemailer.createTransport({
    //   host: "pop.mail.ru",
    //   port: 110,
    //   secure: false,
    //   auth: {
    //     user: "ogabekmengniyozov@mail.ru",
    //     pass: "nrzR50z9W64vZQt7aZsF",
    //   },
    // });

    // await transport.sendMail(
    //   {
    //     from: `Ogabek's Project reset code send`,
    //     to: email,
    //     subject: "Verification link",
    //     text: "sallom",
    //   },
    //   (err) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log("email send");
    //     }
    //   }
    // );
  } catch (e) {
    console.log(e);
    res.status(400).json({
      ok: false,
      message: e + "",
    });
  }
};
