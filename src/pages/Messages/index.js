import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// import CardView from "../../components/CardView";

// import { fetchCardDetail } from "../../store/card/actions";
// import { addFav } from "../../store/card/actions";
// import { postBid } from "../../store/card/actions";
import { postMessage } from "../../store/message/actions";

// import { getHighestBid } from "../../store/card/actions";
// import { getUserWithStoredToken } from "../../store/user/actions";
import { fetchConversation } from "../../store/message/actions";

import { selectCardDetail } from "../../store/card/selectors";
// import { selectHighestBid } from "../../store/card/selectors";
import { selectMessages } from "../../store/message/selectors";
import { selectInboxMessages } from "../../store/message/selectors";

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

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

export default function CardDetail(props) {
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();

  const cardDetail = useSelector(selectCardDetail);
  const userToken = useSelector(selectToken);
  const user = useSelector(selectUser);
  const messages = useSelector(selectMessages);
  const inboxMessages = useSelector(selectInboxMessages);

  const toUserId = cardDetail?.userId;

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    root: {
      flexGrow: 1,
    },
    inboxListRoot: {
      width: "100%",
      maxWidth: "80%",
      backgroundColor: theme.palette.background.paper,
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

  const RenderInboxList = () => {
    return (
      <>
        <List
          component="nav"
          className={classes.inboxListRoot}
          aria-label="mailbox folders"
        >
          {inboxMessages
            ? inboxMessages.map((message, i) => {
                return (
                  <div key={i}>
                    <ListItem
                      button
                      onClick={() => {
                        dispatch(
                          fetchConversation({ remoteUserId: message.userId })
                        );
                      }}
                    >
                      <span style={{ marginRight: 10 }}>
                        <b>
                          <i>{message.createdAt.split("T")[0]}</i>
                        </b>
                      </span>
                      <span style={{ marginRight: 10 }}>
                        <b>van {message.user.name}</b>
                      </span>
                      <span style={{ marginRight: 10 }}>
                        <i> "{message.text}... "</i>
                      </span>
                      {/* <ListItemText primary="Inbox" /> */}
                    </ListItem>
                  </div>
                );
              })
            : null}

          <Divider />
          <ListItem button divider>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
      </>
    );
  };

  return (
    <>
      {userToken ? (
        <span>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <b>INBOX</b>
                </Paper>
              </Grid>

              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <RenderInboxList />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paperMessages}>
                  {/* <Container> */}

                  {messages
                    ? messages.map((message, i) => {
                        const switchAlign =
                          message.userId === user.id
                            ? "flex-end"
                            : "flex-start";
                        const switchJustify =
                          message.userId === user.id ? "right" : "flex-end";
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
                                  {message.userId === user.id ? (
                                    <strong>
                                      <em style={{ fontSize: 8 }}> jij </em>
                                    </strong>
                                  ) : (
                                    <strong>
                                      <em style={{ fontSize: 8 }}>
                                        {" "}
                                        {inboxMessages
                                          ? inboxMessages
                                              ?.filter(
                                                (inboxMessage) =>
                                                  inboxMessage.user.id ===
                                                  message.userId
                                              )
                                              .map((obj) => obj.user.name)
                                          : null}
                                      </em>
                                    </strong>
                                  )}
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
