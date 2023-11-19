//import mongoose
const mongoose = require("mongoose");
const {ObjectId}= mongoose.Schema.Types

const postSchema= new mongoose.Schema({
  
    body:{
        type: String,
        required: true
    },
    photo:{
        type:String,
        required:true
    },
    likes:[{
        type:ObjectId,
        ref:"USER"
    }],
    comments:[{
        comment: {type:String},//jo bhi user comment krega vo yaha ajayega
        postedBy:{type:ObjectId, ref:"USER"} //jis user ne comment kia hoga uski id ajayegi yaha pe
    }],
    postedBy:{
        type: ObjectId,
        ref: "USER" // taki pata chal ske kis user ne post kiya h
    }
})

mongoose.model("POST",postSchema)