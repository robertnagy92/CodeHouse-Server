const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const mongoose = require('mongoose')
const UserModel = mongoose.model("User")
module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    //authorization 
    if(!authorization){
       return res.status(401).json({error:"you need to be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
         return res.status(401).json({error:"you need to be logged in"})
        }

        const {_id} = payload
        UserModel.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
        
        
    })
}