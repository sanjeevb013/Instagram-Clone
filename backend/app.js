const express= require('express')
const app=express()
const port=5000;
const mongoose=require("mongoose");
const cors= require("cors"); //middleware functions
app.use(cors())
require("./models/model") //import schema 
require("./models/post")

app.use(express.json()) //middleware
app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))//import createpost


 //under app.use we can run any middleware 
//middleware ek function h jo req server me ane se pehle uske bich me usme koi bhi changes kr skte h...
//for ex:humne react app se server me data behja hai or vo data json format me nahi hoga to jo humara middleware function h vo us req me ayega bich me or use json format me convert kr dega or middleware se hone ke bad humare req hai vo data ko leke humare react app me ajayegi

mongoose.connect("mongodb://127.0.0.1:27017/insta") //mongo db connection..

mongoose.connection.on("connected",()=>{
    console.log("successfully connected to mongo")
})

mongoose.connection.on("error",()=>{
    console.log("not connected to mongo")
})

app.listen(port,()=>{
    console.log("server running on port " + port)
})






//built in module .........

//const http = require('http');
//third party module express 

//const server= http.createServer((req,res)=>{
//console.log("server created");
//res.end("working")
//});

//server.listen(5000,"localhost", ()=>{
 //   console.log("server running on port 5000");
//})
