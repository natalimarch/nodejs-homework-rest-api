const express = require("express");

const { authenticate, validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../model/user");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/register", validation(joiSchema), ctrlWrapper(ctrl.register));

router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
