const { Schema, model } = require("mongoose");

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
    default: "no img"
  },
  postedBy:{
       type: Schema.Types.ObjectId,
       ref:"User"
    }
},{timestamps:true})


// 2. Define your model
let PostModel = model('Post', PostSchema)

// 3. Export your Model with 'module.exports'
module.exports = PostModel