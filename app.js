const express = require('express')
const cors = require('cors')
const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 5005
const {MONGOURI} = require('./config/keys')




mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

})
mongoose.connection.on('connected',()=>{
    console.log("Connected to MongoDB")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting to MongoDB",err)
})

require('./models/User.model')
require('./models/Post.model')

app.use(express.json())
app.use(cors())
app.use(require('./routes/auth.routes'))
app.use(require('./routes/posts.routes'))



app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})