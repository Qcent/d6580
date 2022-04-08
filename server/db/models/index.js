const { Conversation, UserConvos } = require("./conversation");
const User = require("./user");
const Message = require("./message");

// associations

User.belongsToMany(Conversation, { through: UserConvos });
Conversation.belongsToMany(User, { as: "members", through: UserConvos });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message
};
