const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose"); //import mongoose
const bcrypt = require("bcrypt"); //import bcrypt for hash password.

const USER = mongoose.model("USER"); //
const { Jwt_secret } = require("../keys");// import jwt_secret from key

router.get('/', (req, res) => {
    res.send("hello")
})


//signup api..
router.post("/signup", (req, res) => {
    const { name, userName, email, password } = req.body;
    //explanation of   const {name, userName, email, password}= req.body;  line code
    // const name= req.body.name
    //const userName= req.body.userName


    //condition for any detail missing they show you error
    if (!name || !email || !userName || !password) {
        return res.status(422).json({ error: "please add all the fields" }) //for status 422 
    }

    //this is our model name // findone is a mongodb function
    //findone se hume detail mil jayegi user ki

    USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then((saveUser) => {
        if (saveUser) {
            return res.status(422).json({ error: "user already exist with that email or userName" })
        }

        bcrypt.hash(password, 12).then((hashedPassword) => {
            const user = new USER({    //isme USER schema ka use krke hume ek object bana liye
                name,
                email,
                userName,
                password: hashedPassword
            })

            user.save()
                .then(user => { res.json({ message: "Registered succesfully in mongodb" }) })
                .catch(err => { console.log(err) })
        })

    })
})

//signin api
router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "please add email and password" })
    }
    USER.findOne({ email: email }).then((savedUser) => { // isme findone email ke through uska data la rha h
        if (!savedUser) {
            return res.status(422).json({ error: "invalid email" })
        }
        bcrypt.compare(password, savedUser.password).then((match) => {
            if (match) {
                // return res.status(200).json({message:"signed in successfully"})
                const token = jwt.sign({ _id: savedUser.id }, Jwt_secret)
                const{_id,name,email,userName}=savedUser //id ek variable h jiske andr value saveuser . _id ki
                res.json({token,user:{_id,name,email,userName}})
                
                console.log({token,user:{_id,name,email,userName}})
            }
            else {
                return res.status(422).json({ error: "invalid password" })
            }
        })
            .catch(err => console.log(err))
    })
})

//export router
module.exports = router;