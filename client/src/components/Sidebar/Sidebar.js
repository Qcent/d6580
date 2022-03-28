import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search, Chat, CurrentUser } from './index';

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 21,
    paddingRight: 21,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 15,
  },
}));

const Sidebar = ({
  handleChange,
  searchTerm,
  conversations = [],
  user,
  setActiveChat,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CurrentUser user={user} />
      <Typography className={classes.title}>Chats</Typography>
      <Search handleChange={handleChange} />
      {conversations
        .filter((conversation) =>
          conversation.otherUser.username.includes(searchTerm)
        )
        // .sort((a, b) => (a.otherUser.online < b.otherUser.online ? 1 : -1))
        .sort((a, b) =>
          a.messages[a.messages.length - 1].createdAt <
          b.messages[b.messages.length - 1].createdAt
            ? 1
            : -1
        )
        .map((conversation) => {
          return (
            <Chat
              conversation={conversation}
              key={conversation.otherUser.username}
              setActiveChat={setActiveChat}
            />
          );
        })}
    </Box>
  );
};

export default Sidebar;
