const { sendMail } = require("../../helpers");
const { User } = require("../../model");

const resendEmail = async (req, res, _) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found",
    });
  }

  if (!user.verify) {
    const mail = {
      to: email,
      subject: "Подтверждение email",
      html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Нажмите для подтверждения</a>`,
    };

    sendMail(mail);

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification email sent",
    });
  }

  res.status(400).json({
    status: "Bad Request",
    code: 400,
    message: "Verification has already been passed",
  });
};

module.exports = resendEmail;
