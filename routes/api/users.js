const express = require("express");

const { validation, authenticate, ctrlWrapper } = require("../../middlewares");
const { joiUpdateSub } = require("../../model/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/current/:id",
  validation(joiUpdateSub),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
