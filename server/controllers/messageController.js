const allMessageModel = require("../models/allMessageModel");

const newMessageController = async (req, res) => {
  let { senderId, chatId, text } = req.body;
  try {
    const newMessage = new allMessageModel({
      chatId,
      senderId,
      text,
    });
    await newMessage.save();
    return res.status(200).json(newMessage);
  } catch (err) {
    console.log(err);
  }
};

const getMessageController = async (req, res) => {
  let { chatId } = req.params;

  if (!chatId) {
    return;
  }
  try {
    let messages = await allMessageModel.find({ chatId });
    return res.status(200).json(messages);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  newMessageController,
  getMessageController,
  //   findChatController,
};
