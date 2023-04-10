const chatroomDAO = require("../dao/chatroom");

class ChatroomController {
  // new conversation
  async newConversation(req, res) {
    const { senderId, receiverId } = req.body;
    const conversation = await chatroomDAO.newConversation(
      senderId,
      receiverId
    );
    try {
      const saveConversation = await conversation.save();
      res.status(200).json(saveConversation);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  //get conversation of a user
  async getConversation(req, res) {
    try {
      const { userId } = req.params;
      const conversation = await chatroomDAO.getConversation(userId);
      res.status(200).json(conversation);
    } catch (err) {
      res.status(400).json(err);
    }
  }
  async findConversation(req, res) {
    try {
      const conversation = await chatroomDAO.findConversation({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation);
    } catch (err) {}
  }
  async sendMessage(req, res) {
    const newMessage = new chatroomDAO.sendMessage();
    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(200).json(conversation);
    }
  }
  async getMessage(req, res) {
    try {
      const messages = await chatroomDAO.getMessage.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
x;
module.exports = new ChatroomController();
