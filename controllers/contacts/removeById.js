const { Contact } = require("../../model");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOneAndRemove({
    _id: id,
    owner: req.user._id,
  });
  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = removeById;
