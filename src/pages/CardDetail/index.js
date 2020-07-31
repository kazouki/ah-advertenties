import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import CardView from "../../components/CardView";
import { AH_BLUE } from "../../config/constants.js";

// import { fetchCardDetail } from "../../store/card/actions";
import { addFav } from "../../store/card/actions";
import { postBid } from "../../store/card/actions";
// import { postMessage } from "../../store/message/actions";

// import { getHighestBid } from "../../store/card/actions";
// import { getUserWithStoredToken } from "../../store/user/actions";
// import { fetchMessages } from "../../store/message/actions";

import { selectCardDetail } from "../../store/card/selectors";
import { selectHighestBid } from "../../store/card/selectors";
// import { selectMessages } from "../../store/message/selectors";

import { selectToken } from "../../store/user/selectors";
import { selectUser } from "../../store/user/selectors";

////////
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// import { TextField } from "@material-ui/core";
// import MoodIcon from "@material-ui/icons/Mood";

export default function CardDetail(props) {
  const [bidValue, setBidValue] = useState("default");
  const [tooLowAlert, setTooLowAlert] = useState("");
  // const [text, setText] = useState("");

  const dispatch = useDispatch();
  const id = props.cardId;
  // console.log("id   in cardetail index", id);

  const cardDetail = useSelector(selectCardDetail);
  const highestBidAndId = useSelector(selectHighestBid);
  const userToken = useSelector(selectToken);
  const user = useSelector(selectUser);

  // console.log("cardDetail  in CardDetail page", cardDetail);
  // const toUserId = cardDetail?.userId;

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    modalContainer: {
      background: "rgba(35,144,207,0.4)",
      borderRadius: 8,
      maxWidth: "80vw",
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

  const onAddToFavs = () => {
    dispatch(addFav(id));
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
          <h5>Het bedrag kan niet lager zijn dan het hoogste bod!</h5>
        </b>
      );
    } else setTooLowAlert("");
    if (!e.target.value) setTooLowAlert("");
  };

  // console.log("highestBidAndId  in CardDetail (pages)", highestBidAndId);

  return (
    <>
      {cardDetail ? (
        <Container className={classes.modalContainer}>
          <span>
            {highestBidAndId ? (
              <div className={classes.root}>
                <Grid container spacing={3}>
                  {/* <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      "add to favs button" / tool links
                    </Paper>
                  </Grid> */}

                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <CardView
                        key={cardDetail.id}
                        id={cardDetail.id}
                        title={cardDetail.title}
                        description={cardDetail.description}
                        imageUrl={cardDetail.imageUrl}
                        // hearts={cardDetail.hearts}
                        minimumBid={cardDetail.minimumBid}
                        activeBids={cardDetail.bids.length}
                        bidders={cardDetail.bids}
                        giveHeart={onAddToFavs}
                        detailMode={true}
                        // heartGrid={10}
                      />
                    </Paper>
                  </Grid>

                  {cardDetail.aangeboden ? (
                    <>
                      <Grid item xs={6}>
                        <Paper className={classes.paper}>
                          {user.token ? (
                            <>
                              <div>
                                {`Plaats een bod vanaf `}
                                {highestBidAndId.highestBid
                                  ? `${highestBidAndId.highestBid + 1}`
                                  : `${cardDetail.minimumBid}`}
                                {` euro`}
                              </div>
                              <div>
                                <Input
                                  value={
                                    bidValue === "default" &&
                                    highestBidAndId.highestBid
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
                                />

                                <Button
                                  onClick={onBidSubmitHandler}
                                  style={{
                                    background: "lightblue",
                                    color: "white",
                                    marginLeft: 15,
                                  }}
                                >
                                  plaats bod
                                </Button>
                                {tooLowAlert}
                              </div>
                            </>
                          ) : (
                            <>
                              <Link to="/login">
                                {`Log in om een bod uit te brengen! `}
                              </Link>
                            </>
                          )}
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper className={classes.paper}>
                          {highestBidAndId.highestBid ? (
                            <>
                              <b>De hoogste bieder is </b>
                              {highestBidAndId.highestBidEmail}
                              <div>
                                {" met een bod van "}
                                {highestBidAndId.highestBid} <b> euro</b>
                              </div>
                            </>
                          ) : (
                            <>wees de eerste om een bod uit te brengen!</>
                          )}
                        </Paper>
                      </Grid>{" "}
                    </>
                  ) : null}

                  {/* ----------- */}
                  <>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        {user.token ? (
                          <>
                            <div>
                              <Button
                                onClick={onBidSubmitHandler}
                                style={{ background: AH_BLUE, color: "white" }}
                              >
                                Stuur een bericht
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <Link to="/login">
                              {`Log in om een bericht te sturen! `}
                            </Link>
                          </>
                        )}
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      {/* <Paper className={classes.paper}></Paper> */}
                    </Grid>{" "}
                  </>
                  {/* ----------- */}
                </Grid>
              </div>
            ) : null}
          </span>
        </Container>
      ) : null}
    </>
  );
}
