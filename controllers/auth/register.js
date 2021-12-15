const { User } = require("../../model");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }

  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
  const newUser = new User({ email, avatarURL, verificationToken });
  newUser.setPassword(password);
  newUser.save();

  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Нажмите для подтверждения</a>`,
  };

  sendEmail(mail);
  //   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  //   await User.create({ email, password: hashPassword });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      email,
      avatarURL,
    },
  });
};

module.exports = register;
