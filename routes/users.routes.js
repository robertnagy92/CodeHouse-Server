const express = require('express')
const router = express.Router()
const UserModel = require('../models/User.model');
const PostModel = require("../models/Post.model")
const isLoggedIn = require('../middleware/isLoggedIn')

//get individual user
router.get('/user/:id',isLoggedIn,(req,res)=>{
    UserModel.findOne({_id:req.params.id})  //Get User
    .select("-password") 
    .then(user=>{
         PostModel.find({postedBy:req.params.id}) //Get users posts
         .populate("postedBy","_id name")
         .exec((err,posts)=>{
             if(err){
                 return res.status(422).json({error:err})
             }
             res.json({user,posts})
         })
    }).catch(err=>{
        return res.status(404).json({error: err})
    })
})



//follow user





// module.exports = router;