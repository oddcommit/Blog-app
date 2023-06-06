const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const BlogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  watches: {
    type: Number,
    required: true
  },
  created_at: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Blog = mongoose.model("blogs", BlogSchema);
