import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: 44,
    marginTop: 23,
    marginLeft: 6,
    display: "flex",
    alignItems: "center",
  },
  chip: {
    minWidth:"1.2rem",
    padding: "0 .2rem",
    textAlign:"center",
    backgroundImage: 'linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)',
    borderRadius: '10px 10px 10px 10px',

    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    
  }
}));

const UnreadMessages = ({ count }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
        <div className={classes.chip}>{count}</div>
    </Box>
  );
};

export default UnreadMessages;