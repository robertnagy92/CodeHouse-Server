const express = require('express')
const router = express.Router()
const PostModel = require('../models/Post.model');
const isLoggedIn = require('../middleware/isLoggedIn')

router.get('/allposts', isLoggedIn, (req,res)=>{
  PostModel.find()
  .then((posts)=>{
      res.json(posts)
  }).catch(err=>{
      console.log(err)
  })
  
})

router.post('/createpost', isLoggedIn, (req,res) => {
  const {title, body, postedBy} = req.body
  if(!title || !body){
    return res.status(422).json({error: 'Please fill all fields'})
  }
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