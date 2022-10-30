const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("../../config");

module.exports = async function (to, subject, text, html) {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 587,
      secure: true,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    return await transport.sendMail(
      {
        from: `Ogabek's Project reset code send`,
        to,
        subject,
        text,
        html,
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("email send");
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
};
