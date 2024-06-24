const fs = require("fs");
const jwt = require("jsonwebtoken");
const messageModel = require("../models/messageModel");
const chatModel = require("../models/chatModel");

const createChatController = async (req, res) => {
  let { senderId, receiverId } = req.body;
  try {
    const newChat = new chatModel({
      members: [senderId, receiverId],
    });
    await newChat.save();
    return res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
  }
};

const getChatController = async (req, res) => {
  let { userId } = req.params;

  if (!userId) {
    return;
  }
  try {
    let chat = await chatModel.find({
      members: {
        $in: [userId],
      },
    });
    return res.status(200).json(chat);
  } catch (err) {
    console.log(err);
  }
};

const findChatController = async (req, res) => {
  let { firstId, secondId } = req.params;
  //   console.log(firstId, secondId);

  if (!firstId || !secondId) {
    return;
  }

  try {
    let chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    return res.status(200).json(chat);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createChatController,
  getChatController,
  findChatController,
};
