const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
  getSingleUserController,
  getUserDataController,
  uploadPhotoController,
  getAllChatsController,
} = require("../controllers/userController");
const router = express.Router();
const { authController } = require("../middleware/auth");

const multer = require("multer");

const photoMiddleware = multer({ dest: "uploads/" });

router.post(
  "/uploadPhoto",
  photoMiddleware.single("photo"),
  uploadPhotoController
);

router.post("/register", registerController);

router.post("/login", loginController);

router.put("/update-profile/:id", authController, updateUserController);

router.get("/single-user/:id", getSingleUserController);

router.get("/get-all-chats/:id", getAllChatsController);

router.get("/get-single-user", getUserDataController);

router.get("/auth", authController, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
