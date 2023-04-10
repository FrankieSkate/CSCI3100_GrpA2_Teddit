const knex = require("../data/db");

class ChatroomDAO {
  // new conversation
  async newConversation(senderId, receiverId) {
    const ret = await knex("chatroom-conversation")
      .select("members")
      .where("members", [senderId, receiverId]);
    return ret;
  }
  async getConversation(userId) {
    const get_conversation = await knex("chatroom-conversation")
      .select("members")
      .where("userId", userId);
    return get_conversation;
  }
  async findConversation(firstUserId, secondUserId) {
    const find_conversation = await knex("chatroom-conversation")
      .select("members")
      .where("firstUserId", firstUserId)
      .where("secondUserId", secondUserId);
    return find_conversation;
  }
  async sendMessage(chatroom_text) {
    const send_message = await knex("chatroom-message").insert({
      chatroom_text,
    });
    return send_message;
  }
  async getMessage(conversationId) {
    const get_message = await knex("chatroom-message")
      .select("conversation_id")
      .where("conversation_id", conversationId);
    return get_message;
  }
}

module.exports = new ChatroomDAO();
