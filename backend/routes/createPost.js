const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); //import mongoose
const requireLogin = require("../middlewares/requireLogin");
const POST = mongoose.model("POST")

//Api for display post
router.get("/allposts", requireLogin, (rew, res) => {
    POST.find()
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
})

//Api for create post
router.post("/createPost", requireLogin, (req, res) => {
    const { body, pic } = req.body //ye body, pic react se utha re h
    console.log(pic)
    if (!body || !pic) {
        return res.status(422).json({ error: "pls add all the fields" })
    }
    req.user
    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user
    })
    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => console.log(err))
})

//api for show post in profile
router.get("/myposts", requireLogin, (req, res) => {
    POST.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then(myposts => {
            res.json(myposts)
        })
})

// jab bh hume koi chi update krne hoti h to hum put use krte h 
router.put("/like", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    })
        .then((result) => {
            res.json(result)
        })
        .catch(err => res.status(422).json({ error: err }))
})

router.put("/unlike", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).then((result) => res.json(result))
        .catch(err => res.status(422).json({ error: err }))
})

router.put("/comment", requireLogin, (req, res) => {
    const comment = {
        comment: req.body.text,
        postedBy: req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }//for updation we put a $
    }, {
        new: true
    })
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .then((result) => res.json(result))
        .catch(err => res.status(422).json({ error: err }))
})

//Api to delete post
router.delete("/deletePost/:postId", requireLogin, (req, res) => {
    POST.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .then((post) => {
            
            if (post.postedBy._id.toString() == req.user._id.toString()) {
                post.remove()
                .then(result => { return res.json({ message: "successfully deleted" }) })
                .catch((err) => console.log(err))
            }

        })
        .catch(err => res.status(422).json({ error: err }))

})

module.exports = router