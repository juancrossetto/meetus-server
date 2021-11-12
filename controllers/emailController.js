const Email = require("../models/Email");
const nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

exports.sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    var transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      })
    );

    var mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      //   text: text,
      html: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(400).json({ msg: error });
      } else {
        const email = new Email(req.body);
        email.save();
        return res.json({ email });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Hubo un error al enviar el mail" });
  }
};