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
  followers:[{
    type: Schema.Types.ObjectId,
    ref:"User"}],
  follows:[{
    type: Schema.Types.ObjectId,
    ref:"User"}]
}, { timestamps: true })

// 2. Define your model
let UserModel = model('User', UserSchema)

// 3. Export your Model with 'module.exports'
module.exports = UserModel