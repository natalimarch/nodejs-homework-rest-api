const { Contact } = require("../../model");

const updateById = async (req, res) => {
  const { id } = req.params;
  if (!req.body) {
    const error = new Error("missing fields");
    error.status = 400;
    throw error;
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
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

module.exports = updateById;
