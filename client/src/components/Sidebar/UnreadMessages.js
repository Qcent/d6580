import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: 44,
    marginTop: 23,
    marginLeft: 6,
    display: "flex",
    alignItems: "baseline",
  },
  chip: {
    minWidth:"1rem",
    padding: "0 .2rem",
    textAlign:"center",
    backgroundColor: "#3F92FF",
    borderRadius: "10px",
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "10px",
    lineHeight: "14px",
    letterSpacing: "-0.5px",
    color: "#FFFFFF",
  }
}));

const UnreadMessages = ({ count }) => {
  const classes = useStyles();

  return  count ? (
    <Box className={classes.root}>
        <div className={classes.chip}>{count}</div>
    </Box>
  ) :
  (
      <></>
  );
};

export default UnreadMessages;