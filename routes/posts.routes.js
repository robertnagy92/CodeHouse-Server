const express = require('express')
const router = express.Router()
const PostModel = require('../models/Post.model');
const isLoggedIn = require('../middleware/isLoggedIn')

//GET all posts
router.get('/allposts', isLoggedIn, (req,res)=>{
  PostModel.find()  //no parameters passed => results in finding all posts
  .populate('postedBy', "_id username") //populate the response with the id and name of the user who made the post
  .populate('comments.postedBy','_id username')
  .then((posts)=>{
      res.json({posts})
  }).catch(err=>{
      console.log(err)
  })
  
})

//POST
//creates a new post
router.post('/createpost', isLoggedIn, (req,res) => {
  const {title, body, picture} = req.body
  if(!title || !body || !picture){
    return res.status(422).json({error: 'Please fill all fields'})
  }
  req.user.password = undefined //hides the post requests passport
    const post = new PostModel({
      title,
      body,
      image: picture,
      postedBy: req.user
    })
    post.save().then(result => {
      res.json({post: result})
    }) 
    .catch(err => {
      console.log(err)
    })
})

//GET my post request
  router.get('/myposts', isLoggedIn, (req,res) => {
    PostModel.find({postedBy: req.user._id}) //get all posts by the logged in user
    .populate('postedBy', "_id username") // populate feed with id&name of user which posted
    .then(mypost => {
      res.json({mypost})
    })
    .catch(err => {
      console.log(err)
    })
  })

  //PUT likes request
  router.put('/like', isLoggedIn, (req,res) => {
    PostModel.findByIdAndUpdate(req.body.postId, {
      $push:{likes: req.user._id} 
    },{
      new: true //getting new updated record
    }).exec((err, result) => {
      if(err){
        return res.status(422).json({error: err})
      }else{
        res.json(result)
      }
    })
  })

  //PUT unlike request
  router.put('/unlike', isLoggedIn, (req,res) => {
    PostModel.findByIdAndUpdate(req.body.postId, {
      $pull:{likes: req.user._id}
    },{
      new: true 
    }).exec((err, result) => {
      if(err){
        return res.status(422).json({error: err})
      }else{
        res.json(result)
      }
    })
  })

  //PUT comments request
  router.put('/comment', isLoggedIn, (req,res) => {
    const comment = {
      text: req.body.text,
      postedBy: req.user._id
    }
    PostModel.findByIdAndUpdate(req.body.postId, {
      $push:{comments: comment}
    },{
      new: true 
    })
    .populate("comments.postedBy", "_id username")
    .populate("postedBy","_id username")
    .exec((err, result) => {
      if(err){
        return res.status(422).json({error: err})
      }else{
        res.json(result)
      }
    })
  })

  router.delete('/removepost/:postId', isLoggedIn, (req, res) => {
    PostModel.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err, post) => {
      if(err || !post){
        return res.status(422).json({error: err})
      }
      if(post.postedBy._id.toString() === req.user._id.toString()){
        post.remove()
        .then(result => {
          res.json(result)
        })
        .catch(err => {
          console.log(err)
        })
      }
    })
  })






module.exports = router;