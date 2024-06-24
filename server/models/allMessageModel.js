const mongoose = require("mongoose");

const schemaDesign = new mongoose.Schema(
  {
    chatId: {
      type: String,
      require: true,
    },

    senderId: {
      type: String,
      require: true,
    },

    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const allMessageModel = mongoose.model("messagesData", schemaDesign);
module.exports = allMessageModel;
