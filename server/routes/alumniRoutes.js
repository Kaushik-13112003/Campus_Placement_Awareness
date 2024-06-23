const express = require("express");
const router = express.Router();
const { authController } = require("../middleware/auth");
const {
  alumniRegisterController,
  alumniLoginController,
  updateAlumniController,
  getAlumniDataController,
} = require("../controllers/alumniController");

router.post("/alumni-register", alumniRegisterController);

router.post("/alumni-login", alumniLoginController);

router.put(
  "/alumni-update-profile/:id",
  authController,
  updateAlumniController
);

router.get("/alumni-get-single-user", getAlumniDataController);

module.exports = router;
