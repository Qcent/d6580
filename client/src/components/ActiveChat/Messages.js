import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId, markMessagesRead, conversationId } =
    props;

  useEffect(() => {
    const readList = {};
    messages.forEach((message) => {
      if (!message.isRead && message.senderId !== userId) {
        const data = {
          conversationId: conversationId,
          messageId: message.id,
          isRead: true,
          readerId: userId,
        };
        readList[conversationId] = { [message.id]: data };
      }
    });
    markMessagesRead(readList);
  });

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');
        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
