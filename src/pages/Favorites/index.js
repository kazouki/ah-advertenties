import React from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
// import GridList from "@material-ui/core/GridList";
// import GridListTile from "@material-ui/core/GridListTile";
// import GridListTileBar from "@material-ui/core/GridListTileBar";
// import ListSubheader from "@material-ui/core/ListSubheader";
// import IconButton from "@material-ui/core/IconButton";
// import InfoIcon from "@material-ui/icons/Info";
import { selectCards } from "../../store/card/selectors";
import { selectLayoutState } from "../../store/editor/selectors";
import AHCard from "../../components/Board/Card";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const cards = useSelector(selectCards);
  const layoutState = useSelector(selectLayoutState);
  const myCards = cards?.cards;
  console.log(layoutState);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Jouw kaarten</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>jouw favorieten</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            {myCards
              ? myCards.map((card) => {
                  return (
                    <>
                      {layoutState ? (
                        <AHCard
                          ptextId={card.id}
                          editDisabled={true}
                          initState={layoutState}
                          // saveStateTo={saveCardStateToStore}
                        />
                      ) : null}
                    </>
                  );
                })
              : null}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}></Paper>
        </Grid>
      </Grid>
    </div>
  );
}
