import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { postMessage } from "../../store/message/actions";

import { fetchConversation } from "../../store/message/actions";

// import { selectCardDetail } from "../../store/card/selectors";
import { selectMessages } from "../../store/message/selectors";
import { selectInboxMessages } from "../../store/message/selectors";

import { selectToken } from "../../store/user/selectors";
import { selectUser } from "../../store/user/selectors";

////////
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

export default function CardDetail(props) {
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const { remoteIdFromModal } = useParams();

  // const cardDetail = useSelector(selectCardDetail);
  const userToken = useSelector(selectToken);
  const user = useSelector(selectUser);
  const messages = useSelector(selectMessages);
  const inboxMessages = useSelector(selectInboxMessages);

  const displayMessages = messages.slice(messages.length - 6, messages.length);

  const allInboxUsers = [
    ...new Set(inboxMessages?.map((inboxMessage) => inboxMessage.userId)),
  ].map((e) => inboxMessages.filter((m) => m.userId === e));

  const inboxUsersLatestDates = allInboxUsers.map(
    (e) =>
      e
        .map(function (user) {
          return user.createdAt;
        })
        .sort()
        .reverse()[0]
  );

  const displayInboxMessages = inboxMessages?.filter((m) =>
    inboxUsersLatestDates.includes(m.createdAt)
  );

  const messageBoxRemoteUserId = messages
    ?.filter((message) => {
      return message.userId !== user.id;
    })
    .map((obj) => obj.userId)[0];

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
            ? displayInboxMessages.map((message, i) => {
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
                    </ListItem>
                  </div>
                );
              })
            : null}

          <Divider />
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

                  {displayMessages
                    ? displayMessages.map((message, i) => {
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
                              <div style={{ marginBottom: 20 }}>
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
              <Grid item xs={3}></Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  <Container>
                    <Button
                      disabled={
                        remoteIdFromModal ? false : messages[1] ? false : true
                      }
                      onClick={() =>
                        dispatch(
                          postMessage({
                            toUserId: remoteIdFromModal
                              ? remoteIdFromModal
                              : messageBoxRemoteUserId,
                            text,
                          })
                        )
                      }
                    >
                      stuur bericht
                    </Button>
                  </Container>
                </Paper>
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </div>
        </span>
      ) : null}
    </>
  );
}
