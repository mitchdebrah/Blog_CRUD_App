  
const mongoose = require("mongoose");

const SectionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Section", SectionSchema)