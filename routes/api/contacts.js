const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, updateFavotiteSchema } = require("../../model/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

router.put("/:id", ctrlWrapper(ctrl.updateById));

router.patch(
  "/:id/favorite",
  validation(updateFavotiteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
