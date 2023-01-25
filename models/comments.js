const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
  comment: {
    type: Array,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Books"
  }
})

module.exports = mongoose.model("Comments", commentSchema);