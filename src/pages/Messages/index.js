import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postMessage } from "../../store/message/actions";

import { fetchConversation } from "../../store/message/actions";

import { selectMessages } from "../../store/message/selectors";
import { selectInboxMessages } from "../../store/message/selectors";
import { selectRemoteUsername } from "../../store/message/selectors";
import { selectRemoteUserId } from "../../store/message/selectors";

import { fetchInboxMessages } from "../../store/message/actions";
import { messageIsRead } from "../../store/message/actions";

import { selectToken } from "../../store/user/selectors";
import { selectUser } from "../../store/user/selectors";

import { AH_BLUE_EXTRALIGHT } from "../../config/constants.js";
import { AH_BLUE_LIGHT } from "../../config/constants.js";
import Navigation from "../../components/Navigation";

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
  const remoteIdFromModal = useSelector(selectRemoteUserId);

  const userToken = useSelector(selectToken);
  const user = useSelector(selectUser);
  const messages = useSelector(selectMessages);
  const inboxMessages = useSelector(selectInboxMessages);
  const remoteUsername = useSelector(selectRemoteUsername);

  const minMessages = messages.length - 8 < 0 ? 0 : messages.length - 8;
  const displayMessages = messages.slice(minMessages, messages.length);

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
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: AH_BLUE_LIGHT,
      height: "100%",

      flexGrow: 1,
    },
    messageGrid: {
      maxWidth: "85%",
      marginTop: 15,
      marginBottom: 30,
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
    paperTop: {
      marginTop: 10,
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
        Laatst verzonden berichten
        <Divider />
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
                      style={{ margin: 15 }}
                      button
                      onClick={() => {
                        if (message.userId === user.id) {
                          dispatch(
                            fetchConversation({
                              remoteUserId: message.recipient.id,
                            })
                          );

                          dispatch({
                            type: "SET_REMOTE_USERNAME",
                            payload: message.recipient,
                          });
                          dispatch({
                            type: "SET_REMOTE_USERNAME_AND_ID",
                            payload: {
                              name: message.recipient.name,
                              id: message.recipient.id,
                            },
                          });
                        } else {
                          dispatch(
                            messageIsRead({ message, activeUser: user.id })
                          );
                          dispatch(
                            fetchConversation({ remoteUserId: message.userId })
                          );
                          dispatch({
                            type: "SET_REMOTE_USERNAME",
                            payload: message.user,
                          });
                          dispatch({
                            type: "SET_REMOTE_USERNAME_AND_ID",
                            payload: {
                              name: message.user.name,
                              id: message.userId,
                            },
                          });
                        }
                      }}
                    >
                      <span style={{ marginRight: 10 }}>
                        <b>
                          <i>{message.createdAt.split("T")[0]}</i>
                        </b>
                      </span>
                      <span style={{ marginRight: 10 }}>
                        {message.user.name === user.name ? (
                          <>
                            <b>van jou aan {message.recipient.name}</b>
                          </>
                        ) : (
                          <b>van {message.user.name} aan jou </b>
                        )}
                      </span>
                      <span style={{ marginRight: 10 }}>
                        <i> "{message.text}... "</i>
                      </span>
                    </ListItem>
                    <Divider />
                  </div>
                );
              })
            : null}
        </List>
      </>
    );
  };

  return (
    <div>
      <Navigation />
      {userToken ? (
        <span>
          <div className={classes.root}>
            <Grid container spacing={3} className={classes.messageGrid}>
              <Grid item xs={12}>
                <Paper className={classes.paperTop}>
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
                  {remoteUsername ? (
                    <span style={{ fontSize: 13 }}>
                      <b>Jouw gesprek met</b> {remoteUsername}
                    </span>
                  ) : null}
                  <Divider style={{ marginTop: 4, marginBottom: 10 }} />
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
                                              .map((obj) => obj.user.name)[0]
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
                        remoteIdFromModal ? false : messages[0] ? false : true
                      }
                      onClick={() => {
                        dispatch(
                          postMessage({
                            toUserId: remoteIdFromModal
                              ? remoteIdFromModal
                              : messageBoxRemoteUserId,
                            text,
                          })
                        );
                        dispatch(fetchInboxMessages());
                      }}
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
    </div>
  );
}
