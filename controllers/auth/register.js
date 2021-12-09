const { User } = require("../../model");
const { Conflict } = require("http-errors");
// const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }

  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.save();
  //   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  //   await User.create({ email, password: hashPassword });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      email,
    },
  });
};

module.exports = register;
