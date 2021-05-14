const { Schema, model } = require("mongoose");

// 1. Define your schema
let UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    min: 5,
    max: 25,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: "",
  },
  followers: {
    type: Array,
    default: [],
  },
  follows: {
    type: Array,
    default: [],
  }
}, { timestamps: true })

// 2. Define your model
let UserModel = model('user', UserSchema)

// 3. Export your Model with 'module.exports'
module.exports = UserModel