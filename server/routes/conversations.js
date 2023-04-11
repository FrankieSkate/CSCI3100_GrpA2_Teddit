import express from "express";
import Conversation from "../models/Conversation.js";

const router = express.Router();

/*CREATING NEW CHAT*/
router.post("/" , async (req, res) => {   
    try {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId],
        });
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*GETTING CONVERSATION RECORD BY USERID*/
router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;