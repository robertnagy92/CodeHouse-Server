const express = require('express')
const router = express.Router()
const PostModel = require('../models/Post.model');
const isLoggedIn = require('../middleware/isLoggedIn')

//GET all posts
router.get('/allposts', (req,res)=>{
  PostModel.find()  //no parameters passed => results in finding all posts
  .populate('postedBy', "_id username") //populate the response with the id and name of the user who made the post
  .then((posts)=>{
      res.json(posts)
  }).catch(err=>{
      console.log(err)
  })
  
})

//POST
//creates a new post
router.post('/createpost', isLoggedIn, (req,res) => {
  const {title, body, postedBy} = req.body
  if(!title || !body){
    return res.status(422).json({error: 'Please fill all fields'})
  }
  req.user.password = undefined //hides the post requests passport
    const post = new PostModel({
      title,
      body,
      postedBy: req.user
    })
    post.save().then(result => {
      res.json({post: result})
    }) 
    .catch(err => {
      console.log(err)
    })
})






module.exports = router;