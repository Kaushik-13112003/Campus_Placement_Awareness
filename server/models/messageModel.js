const mongoose = require("mongoose");

const schemaDesign = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userData",
    required: true,
  },

  alumniId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userData",
    required: true,
  },

  messages: [
    {
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  //   timestamp: { type: Date, default: Date.now },
});

const messageModel = mongoose.model("messageData", schemaDesign);
module.exports = messageModel;
