const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({
        senderId,
        text,
        conversationId,
        isRead: false,
      });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      isRead: false,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

// marks messages as read or not // expects {messageId, status, conversationId } in body
router.put("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    let response = [];

    for (const convoId in req.body) {
      // check to see if the user participates in the conversation
      const auth = await Conversation.userParticipates(convoId, userId);
      if (!auth) {
        return res.sendStatus(403);
      }
      //update every message in the conversation that was read
      for (const msgId in req.body[convoId]) {
        const { messageId, isRead, conversationId } = req.body[convoId][msgId];
        // if conversationId and messageId have been provided find the message by it's id
        if (conversationId && messageId) {
          const message = await Message.findOne({ where: { id: messageId } });
          // if the message is found and it's associated conversation matches the conversationId update the isRead
          if (message && message.conversationId === conversationId) {
            const data = await message.update({ isRead: isRead });
            //return res.json(data);
            response.push(data);
          } else {
            // message not found or not in provided conversation, return error 'Not Found'
            return res.sendStatus(404);
          }
        } else {
          // if we don't have conversation id or message id, return error 'Bad Request'
          return res.sendStatus(400);
        }
      }
    }
    return res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
