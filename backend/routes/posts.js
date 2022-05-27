const router = require("express").Router();
const Post = require("../models/Post");
const verify = require("../verifytoken");

router.post("/", verify, async (req, res) => {

    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

//get posts by senderId
router.get("/",verify,async(req,res)=>{
    const senderId = req.query.senderId;
    console.log(senderId);
    try{
        const posts = await Post.find({senderId:senderId}).sort({createdAt:-1});
        console.log(posts);
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
}
);

module.exports = router;