import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CardView from "../../components/CardView";

// import { fetchCardDetail } from "../../store/card/actions";
import { addHeart } from "../../store/card/actions";

import { postBid } from "../../store/card/actions";
// import { getHighestBid } from "../../store/card/actions";
// import { getUserWithStoredToken } from "../../store/user/actions";
import { fetchMessages } from "../../store/message/actions";

import { selectCardDetail } from "../../store/card/selectors";
import { selectHighestBid } from "../../store/card/selectors";
import { selectMessages } from "../../store/message/selectors";

import { selectToken } from "../../store/user/selectors";
import { selectUser } from "../../store/user/selectors";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

////////

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

export default function CardDetail(props) {
  const [bidValue, setBidValue] = useState("default");
  const [tooLowAlert, setTooLowAlert] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();

  const cardDetail = useSelector(selectCardDetail);
  const highestBidAndId = useSelector(selectHighestBid);
  const userToken = useSelector(selectToken);
  const user = useSelector(selectUser);
  const messages = useSelector(selectMessages);

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
    chatboxContainer: {
      maxHeight: 60,
      width: "30vw",
    },
  }));
  const classes = useStyles();

  const onGiveHeart = () => {
    dispatch(addHeart(id));
  };

  const onBidSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      postBid({
        cardId: id,
        amount:
          bidValue === "default" && highestBidAndId.highestBid
            ? highestBidAndId.highestBid + 1
            : bidValue === "default" && !highestBidAndId.highestBid
            ? cardDetail.minimumBid + 1
            : bidValue,
        email: user.email,
        token: user.token,
        highestBid: highestBidAndId.highestBid,
      })
    );
  };

  const onSetBidValue = (e) => {
    setBidValue(e.target.value);
    if (e.target.value < highestBidAndId.highestBid + 1) {
      setTooLowAlert(
        <b>
          <h5>The amount should be higher than the highest bid!</h5>
        </b>
      );
    } else setTooLowAlert("");
    if (!e.target.value) setTooLowAlert("");
  };

  const fetchMessagesHandler = () => {
    const cardOwnerId = cardDetail.userId;
    dispatch(fetchMessages({ cardOwnerId }));
  };

  // console.log("cardDetail ", cardDetail);
  // console.log("userToken ", userToken);
  console.log("highestBidAndId ", highestBidAndId);
  console.log("highestBidAndId ", highestBidAndId);

  return (
    <>
      {userToken ? (
        <span>
          {highestBidAndId ? (
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    "add to favs button" / tool links
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    {cardDetail ? (
                      <CardView
                        key={cardDetail.id}
                        id={cardDetail.id}
                        title={cardDetail.title}
                        imageUrl={cardDetail.imageUrl}
                        hearts={cardDetail.hearts}
                        minimumBid={cardDetail.minimumBid}
                        activeBids={cardDetail.bids.length}
                        bidders={cardDetail.bids}
                        giveHeart={onGiveHeart}
                        detailMode={true}
                        heartGrid={10}
                      />
                    ) : null}
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    messagebox section
                    <Container>
                      <button onClick={fetchMessagesHandler}>fetch test</button>
                      {messages[0] ? JSON.stringify(messages[0]) : null}
                    </Container>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Container>
                      Place a bid (starting at $
                      {/* {highestBidAndId.highestBid && cardDetail
                        ? `${highestBidAndId.highestBid + 1}`
                        : `${cardDetail.minimumBid}`}
                      ) */}
                    </Container>

                    <Container>
                      {/* <Form.Control
                        value={
                          bidValue === "default" &&
                          highestBidAndId.highestBid &&
                          cardDetail
                            ? highestBidAndId.highestBid + 1
                            : bidValue === "default" &&
                              !highestBidAndId.highestBid
                            ? cardDetail.minimumBid + 1
                            : bidValue
                        }
                        onChange={onSetBidValue}
                        type="number"
                        min={
                          highestBidAndId && cardDetail
                            ? highestBidAndId.highestBid + 1
                            : cardDetail.minimumBid
                        }
                        placeholder="Bid"
                        required
                      /> */}

                      <Button
                        variant="outline-secondary"
                        onClick={onBidSubmitHandler}
                      >
                        place bid
                      </Button>
                      {tooLowAlert}
                    </Container>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    {highestBidAndId.highestBid ? (
                      <>
                        Highest bidder is {highestBidAndId.highestBidEmail} with
                        ${highestBidAndId.highestBid}
                      </>
                    ) : (
                      <>be the first one to place a bid!</>
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>.....</Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>emoji button?</Paper>
                </Grid>
              </Grid>
            </div>
          ) : null}
        </span>
      ) : null}
    </>
  );
}
