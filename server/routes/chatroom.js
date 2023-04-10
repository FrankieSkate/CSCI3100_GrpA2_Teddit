const router = require("express").Router();
const chatroomController = require("../controllers/chatroom");

router.post("/newConversation", chatroomController.newConversation);

router.get("/getConversation", chatroomController.getConversation);

router.get("/findConversation", chatroomController.findConversation);

router.post("/sendMessage", chatroomController.sendMessage);

router.get("/getMessage", chatroomController.getMessage);

module.exports = router;
