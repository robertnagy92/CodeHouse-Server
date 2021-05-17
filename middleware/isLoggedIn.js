const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/keys')
const mongoose = require('mongoose')
const UserModel = mongoose.model("User")

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    //authorization = Bearer + token that one receives for logging in
    if(!authorization){
       return res.status(401).json({error:"You need to be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_KEY,(err,payload)=>{
        if(err){
         return res.status(401).json({error:"You need to be logged in"})
        }

        const {_id} = payload
        UserModel.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
        
        
    })
}