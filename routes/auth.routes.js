const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/User.model');
const {JWT_KEY} = require('../config/keys')
const isLoggedIn = require('../middleware/isLoggedIn')

//get user - testing
router.get('/', (req, res) => {
  res.send('hello')
})

router.get('/protected', isLoggedIn, (req,res) => {
  res.send('Welcome user')
})

// signup and create collection in DB with hashed password
router.post('/signup', (req,res) => {
  console.log(req.body) //testing functionality in postman
  const {username, email, password} = req.body
  if(!email || !password || !username){
    return res.status(422).json({error: "Please fill all fields"})
  }
 UserModel.findOne({email: email})
 .then((savedUser) => {
   if(savedUser){
    return res.status(422).json({error: "User with this email already exists"})
   }
bcrypt.hash(password,10)
.then(hashedpassword=> {
    const user = new UserModel({
      email,
      password: hashedpassword,
      username
    })
    user.save()
    .then(user => {
      res.json({message: "Saved succesfully"})
    })
    .catch(err => {
      console.log(err)
    })
  })

})
 .catch(err => {
   console.log(err)
 }) 
})

//SignIn and give access to user if collection already exists in DB
router.post('/signin', (req, res) => {
  const {email,password} = req.body
  if(!email || !password){
    return res.status(422).json({error: "Please fill all fields"})
  }
  UserModel.findOne({email: email})
  .then(savedUser => {
    if(!savedUser){
      return res.status(422).json({error: "Invalid email or password"})
    }
    bcrypt.compare(password, savedUser.password)
    .then(match => {
      if(match){
        //res.json({message: 'Sign In was succesful'})
        const token = jwt.sign({_id: savedUser._id}, JWT_KEY)
        res.json({token})
      }
      else{
        return res.status(422).json({error: "Invalid email or password"})
      }
    })
    .catch(err => {
      console.log(err)
    })
  })
})

module.exports = router