const mongoose = require("mongoose");

const schemaDesign = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },

    type: {
      type: String,
      require: true,
    },

    department: {
      type: String,
      require: true,
    },

    about: {
      type: String,
      require: true,
    },

    address: {
      type: String,
      require: true,
    },

    state: {
      type: String,
      require: true,
    },

    photos: {
      type: [String],
    },

    country: {
      type: String,
      require: true,
    },

    postalCode: {
      type: String,
      require: true,
    },

    city: {
      type: String,
      require: true,
    },

    properties: [
      {
        type: Object,
      },
    ],

    admin: {
      type: mongoose.Types.ObjectId,
      ref: "userData",
    },
  },
  {
    timestamps: true,
  }
);

const companyModel = mongoose.model("companyData", schemaDesign);
module.exports = companyModel;
