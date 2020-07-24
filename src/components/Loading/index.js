import React from "react";
import "./spinner.css";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: "9999",
    width: "100vw",
    height: "100vh",

    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    backgroundColor: "white",
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );
}
