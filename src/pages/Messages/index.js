import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// import CardView from "../../components/CardView";

// import { fetchCardDetail } from "../../store/card/actions";
import { addFav } from "../../store/card/actions";
import { postBid } from "../../store/card/actions";
import { postMessage } from "../../store/message/actions";

// import { getHighestBid } from "../../store/card/actions";
// import { getUserWithStoredToken } from "../../store/user/actions";
// import { fetchMessages } from "../../store/message/actions";

import { selectCardDetail } from "../../store/card/selectors";
import { selectHighestBid } from "../../store/card/selectors";
import { selectMessages } from "../../store/message/selectors";

import { selectToken } from "../../store/user/selectors";
import { selectUser } from "../../store/user/selectors";

////////
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
// import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import MoodIcon from "@material-ui/icons/Mood";

export default function CardDetail(props) {
  // const [bidValue, setBidValue] = useState("default");
  // const [tooLowAlert, setTooLowAlert] = useState("");
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  //   const { id } = useParams();
  // const id = 1;
  const cardDetail = useSelector(selectCardDetail);
  // const highestBidAndId = useSelector(selectHighestBid);
  const userToken = useSelector(selectToken);
  const user = useSelector(selectUser);
  const messages = useSelector(selectMessages);

  const toUserId = cardDetail?.userId;

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    paperMessages: {
      padding: theme.spacing(2),
      minHeight: 250,
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();

  // const onGiveHeart = () => {
  //   dispatch(addHeart(id));
  // };

  // const onBidSubmitHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(
  //     postBid({
  //       cardId: id,
  //       amount:
  //         bidValue === "default" && highestBidAndId.highestBid
  //           ? highestBidAndId.highestBid + 1
  //           : bidValue === "default" && !highestBidAndId.highestBid
  //           ? cardDetail.minimumBid + 1
  //           : bidValue,
  //       email: user.email,
  //       token: user.token,
  //       highestBid: highestBidAndId.highestBid,
  //     })
  //   );
  // };

  // const onSetBidValue = (e) => {
  //   setBidValue(e.target.value);
  //   if (e.target.value < highestBidAndId.highestBid + 1) {
  //     setTooLowAlert(
  //       <b>
  //         <h5>The amount should be higher than the highest bid!</h5>
  //       </b>
  //     );
  //   } else setTooLowAlert("");
  //   if (!e.target.value) setTooLowAlert("");
  // };

  // const fetchMessagesHandler = () => {
  //   const cardOwnerId = cardDetail.userId;
  //   dispatch(fetchMessages({ cardOwnerId }));
  // };

  // console.log("cardDetail ", cardDetail);
  // console.log("userToken ", userToken);
  // console.log("highestBidAndId ", highestBidAndId);
  // console.log("highestBidAndId ", highestBidAndId);

  return (
    <>
      {userToken ? (
        <span>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>Berichten</Paper>
              </Grid>

              <Grid item xs={6}>
                <Paper className={classes.paper}></Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paperMessages}>
                  {/* <Container> */}

                  {messages
                    ? messages.map((message, i) => {
                        const switchAlign =
                          message.fromUserId === user.id
                            ? "flex-end"
                            : "flex-start";
                        const switchJustify =
                          message.fromUserId === user.id ? "right" : "flex-end";
                        return (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: switchAlign,
                              flexDirection: "column",
                              justifyContent: switchJustify,
                            }}
                          >
                            <div key={i}>
                              <div style={{ float: "top" }}>
                                <Container>
                                  {message.text}
                                  <strong>
                                    <em style={{ fontSize: 8 }}> jij </em>
                                  </strong>
                                </Container>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : null}

                  {/* </Container> */}
                </Paper>
              </Grid>

              <Grid item xs={6}>
                {/*                         */}
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <Container>
                    <TextField
                      onChange={(e) => setText(e.target.value)}
                      fullWidth={true}
                      variant="outlined"
                      label="jouw bericht"
                    />
                  </Container>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  <div></div>

                  <div></div>
                </Paper>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  <Container>
                    <Button
                      onClick={() => dispatch(postMessage({ toUserId, text }))}
                    >
                      stuur bericht
                    </Button>
                  </Container>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  <Container>
                    <MoodIcon />
                  </Container>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </span>
      ) : null}
    </>
  );
}
