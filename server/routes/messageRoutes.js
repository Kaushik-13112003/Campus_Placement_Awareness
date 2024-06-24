const express = require("express");

const router = express.Router();
const {
  createChatController,
  getChatController,
  findChatController,
} = require("../controllers/chatController");
const {
  newMessageController,
  getMessageController,
} = require("../controllers/messageController");

router.post("/new-message", newMessageController);

router.get("/find-message/:chatId", getMessageController);

module.exports = router;
