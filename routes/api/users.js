const express = require("express");

const {
  upload,
  validation,
  authenticate,
  ctrlWrapper,
} = require("../../middlewares");
const { joiUpdateSub, userEmailValidation } = require("../../model/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/current/:id",
  validation(joiUpdateSub),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

router.post(
  "/verify",
  validation(userEmailValidation),
  ctrlWrapper(ctrl.resendEmail)
);

module.exports = router;
