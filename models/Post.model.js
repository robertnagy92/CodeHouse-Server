const {Schema, model} = require("mongoose");
const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types //bug fix
//for some reason if i don't destructure id i can't get the postedBy field values when i map over them

// 1. Define your schema
let PostSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true
  },
  image: {
    type: String,
    required:true
  },
  likes: [
    {
      type: ObjectId, 
      ref: "User"
    }
  ],
  comments:[{
    text: String,
    postedBy: {type: ObjectId,
               ref: "User"}
  }],
  postedBy:{
    type: ObjectId,
    ref:"User"},
})


// 2. Define your model
let PostModel = model('Post', PostSchema)

// 3. Export your Model with 'module.exports'
module.exports = PostModel