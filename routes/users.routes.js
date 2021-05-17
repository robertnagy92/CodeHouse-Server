const express = require('express')
const router = express.Router()
const UserModel = require('../models/User.model');
const isLoggedIn = require('../middleware/isLoggedIn')

//get individual user
router.get("/user/:id", isLoggedIn, (req, res) => {
  UserModel.findById(req.params.id)
  .then(() => {
       res.status(200).json(req.session.loggedInUser)
  })
  .catch((err) => {
       res.status(500).json({
            error: 'Something went wrong',
            message: err
       })
  })  
});

//follow user





module.exports = router;