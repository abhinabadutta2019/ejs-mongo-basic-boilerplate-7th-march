const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

//
const Blog = mongoose.model("Blog", blogSchema);
//
module.exports = Blog;
