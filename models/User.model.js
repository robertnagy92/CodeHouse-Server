const { Schema, model } = require("mongoose");

// 1. Define your schema
let UserSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: "https://res.cloudinary.com/do6dzkp4n/image/upload/v1621574504/download_cz9fam.png"
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