const express = require("express");

const { validation, ctrlWrapper, authenticate } = require("../../middlewares");
const { joiSchema, updateFavotiteSchema } = require("../../model/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:id", authenticate, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(joiSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:id", authenticate, ctrlWrapper(ctrl.removeById));

router.put("/:id", authenticate, ctrlWrapper(ctrl.updateById));

router.patch(
  "/:id/favorite",
  validation(updateFavotiteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
