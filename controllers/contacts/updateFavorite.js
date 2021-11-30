const { Contact } = require("../../model");

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  if (!req.body) {
    const error = new Error("missing field favorite");
    error.status = 400;
    throw error;
  }
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
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

module.exports = updateFavorite;
