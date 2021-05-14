const { Schema, model } = require("mongoose");

// 1. Define your schema
let PostSchema = new Schema({
  userId: {
    type: String,
    require: true
  },
  description: {
    type: String,
  },
  image: {
    type: String
  },
  likes: {
    type: Array,
    default: []
  }
}, { timestamps: true })

// 2. Define your model
let PostModel = model('post', PostSchema)

// 3. Export your Model with 'module.exports'
module.exports = PostModel