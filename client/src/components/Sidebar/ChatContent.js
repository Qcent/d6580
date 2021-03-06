import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 20,
    flexGrow: 1,
    maxWidth: '75%',
  },
  username: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 13,
    color: '#9CADC8',
    letterSpacing: -0.17,
  },
  boldText: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  blackText: {
    color: 'black',
  },
}));

const ChatContent = ({ conversation }) => {
  const classes = useStyles();

  const { otherUser } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;
  const latestMessageRead =
    conversation.messages.length &&
    conversation.messages[conversation.messages.length - 1].isRead;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={`${classes.previewText} ${
            latestMessageRead
              ? ''
              : `${classes.boldText} ${
                  otherUser.online ? `${classes.blackText}` : ''
                }`
          }
          `}
        >
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
