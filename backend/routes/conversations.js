const router = require("express").Router();
const Conversation = require("../models/Conversation");
const verify = require("../verifytoken");

//new conv

router.post("/",verify, async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId",verify, async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// is there a conv between 2 users
router.get("/exists/:userId1/:userId2",verify, async (req, res) => {
  try {
    const conversation = await Conversation.exists({
      members: { $all: [req.params.userId1, req.params.userId2] },
    });
    
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv by id
router.get("/findbyId/:id",verify, async (req, res) => {
  try {
    
    const conversation = await Conversation.findById(req.params.id);
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId
router.get("/find/:firstUserId/:secondUserId",verify, async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;