const mongoose = require("mongoose");

const schemaDesign = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("chatModelData", schemaDesign);
module.exports = chatModel;
