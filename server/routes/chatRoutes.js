const express = require("express");

const router = express.Router();
const {
  createChatController,
  getChatController,
  findChatController,
} = require("../controllers/chatController");

router.post("/create-chat", createChatController);
router.get("/findChat/:userId", getChatController);
router.get("/find/:firstId/:secondId", findChatController);

module.exports = router;
