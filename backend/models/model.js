//import mongoose
const mongoose = require("mongoose");

//Schema for mongoose
const userSchema= new mongoose.Schema({
name:{
    type:String,
    required:true
},
userName:{
    type:String,
    required:true
},
email:{
    type:String,
    require:true
},
    password:{
        type:String,
        required:true
    }

})
//wrap schema in mongoose.model.. now we use anywhere this schema
mongoose.model("USER",userSchema)