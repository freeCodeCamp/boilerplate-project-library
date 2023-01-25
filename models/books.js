const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  commentcount: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model("Books", bookSchema);