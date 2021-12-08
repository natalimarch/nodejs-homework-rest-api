const { User } = require("../../model");

const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const { subscription } = req.body;
  if (!req.body) {
    const error = new Error("missing field favorite");
    error.status = 400;
    throw error;
  }
  const result = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );
  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateSubscription;
