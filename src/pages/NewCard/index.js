import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCard } from "../../store/card/actions";
import { selectToken } from "../../store/user/selectors";

import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Checkbox from "@material-ui/core/Checkbox";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { AH_BLUE } from "../../config/constants.js";

let theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  palette: {
    primary: {
      light: "#63ccff",
      main: AH_BLUE,
      dark: "#006db3",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  adornment: {
    margin: 20,
  },
  fieldContainerRed: {
    background: "rgba(249,101,80,0.1)",
    marginLeft: -90,
    margin: 8,
    paddingBottom: 10,
  },
  fieldContainerGreen: {
    background: "rgba(139,173,80,0.1)",
    marginLeft: 120,
    margin: 8,
    paddingBottom: 10,
  },
  fieldContainerBlue: {
    background: "rgba(127,168,242,0.1)",
    marginLeft: -30,
    margin: 8,
    paddingBottom: 10,
  },
  fieldContainerYellow: {
    background: "rgba(255,205,70,0.1)",

    marginLeft: 100,
    margin: 8,
    paddingBottom: 10,
  },
  fieldContainerPurple: {
    background: "rgba(198,47,222,0.1)",
    marginLeft: -120,
    margin: 8,
    paddingBottom: 10,
  },
  fieldContainerLightBlue: {
    background: "rgba(0,226,255,0.1)",
    marginLeft: 80,
    margin: 8,
    paddingBottom: 10,
  },
}));

export default function NewCard() {
  const [state, setState] = useState({
    cardFields: {
      aangeboden: false,
      gevraagd: false,
      title: "",
      description: "",
      name: "",
      telephone: "",
      email: "",
      date: "",
      imageUrl: "",
      minimumBid: 0,
    },
  });

  const userToken = useSelector(selectToken);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (!userToken) {
      history.push("/login");
    }
  });

  const onCreateCard = (e) => {
    e.preventDefault();
    dispatch(
      createCard({
        aangeboden: state.cardFields.aangeboden,
        gevraagd: state.cardFields.gevraagd,
        title: state.cardFields.title,
        description: state.cardFields.description,
        name: state.cardFields.name,
        telephone: state.cardFields.telephone,
        email: state.cardFields.email,
        date: state.cardFields.date,
        imageUrl: state.cardFields.imageUrl,
        minimumBid: state.cardFields.minimumBid,
      })
    );
    history.push("/");
  };

  const onFieldChangeHandler = (e) => {
    const newState = {
      cardFields: {
        ...state.cardFields,
        [e.target.name]:
          e.target.name !== "aangeboden" && e.target.name !== "gevraagd"
            ? e.target.value
            : e.target.checked,
      },
    };
    setState(newState);
  };

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Container
          style={{
            width: "98%",
            // height: "70vw",
            background: "rgb(48,194,255, 0.04)",
            paddingTop: 10,
            marginTop: 10,
          }}
        >
          <Container
            style={{
              width: "50%",
              // height: "40%",
              minWidth: "400px",
              minHeight: "400px",
              background: "white",
              paddingTop: 20,
              borderRadius: 10,
            }}
          >
            <Container style={{ marginTop: 0 }}>
              <Container className={classes.fieldContainerRed}>
                <FormControl className={classes.margin}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <InputAdornment
                        position="start"
                        className={classes.adornment}
                      >
                        Bied je iets aan?
                      </InputAdornment>
                      <Checkbox
                        name="aangeboden"
                        checked={state?.cardFields?.aangeboden}
                        onChange={onFieldChangeHandler}
                        color="default"
                        className={classes.checkbox}
                      />
                    </Grid>
                  </Grid>
                </FormControl>
              </Container>

              <Container className={classes.fieldContainerGreen}>
                <FormControl className={classes.margin}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <InputAdornment
                        position="start"
                        className={classes.adornment}
                      >
                        Ben je op zoek naar iets?
                      </InputAdornment>

                      <Checkbox
                        name="gevraagd"
                        checked={state?.cardFields?.gevraagd}
                        onChange={onFieldChangeHandler}
                        color="default"
                        className={classes.checkbox}
                      />
                    </Grid>
                  </Grid>
                </FormControl>
              </Container>

              <Container className={classes.fieldContainerBlue}>
                <FormControl className={classes.margin}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <InputAdornment
                        position="start"
                        className={classes.adornment}
                      >
                        Wat is de titel van je kaart?
                      </InputAdornment>

                      <TextField
                        name="title"
                        id="input-with-icon-grid"
                        value={state.cardFields?.title}
                        onChange={onFieldChangeHandler}
                        type="text"
                      />
                    </Grid>
                  </Grid>
                </FormControl>
              </Container>

              <Container className={classes.fieldContainerYellow}>
                <FormControl className={classes.margin}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <InputAdornment
                        position="start"
                        className={classes.adornment}
                      >
                        Wat is de beschrijving van je kaart?
                      </InputAdornment>

                      <TextareaAutosize
                        style={{
                          borderRadius: 4,
                          width: 400,
                          outline: "none",
                          maxWidth: 300,
                          minWidth: 300,
                          maxHeight: 100,
                          minHeight: 100,
                          resize: "none",
                        }}
                        aria-label="minimum height"
                        rowsMin={10}
                        rows={10}
                        rowsMax={10}
                        // inputProps={descriptionInputProps}
                        name="description"
                        value={state.cardFields?.description}
                        onChange={onFieldChangeHandler}
                        type="text"
                      />
                    </Grid>
                  </Grid>
                </FormControl>
              </Container>

              <Container className={classes.fieldContainerPurple}>
                <FormControl className={classes.margin}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <InputAdornment
                        position="start"
                        className={classes.adornment}
                      >
                        Wat is jouw naam op je kaart?
                      </InputAdornment>

                      <TextField
                        name="name"
                        id="input-with-icon-grid"
                        value={state.cardFields?.name}
                        onChange={onFieldChangeHandler}
                        type="text"
                      />
                    </Grid>
                  </Grid>
                </FormControl>
              </Container>

              <Container className={classes.fieldContainerLightBlue}>
                <FormControl className={classes.margin}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <InputAdornment
                        position="start"
                        className={classes.adornment}
                      >
                        Wat is het telefoon nummer op je kaart?
                      </InputAdornment>

                      <TextField
                        name="telephone"
                        id="input-with-icon-grid"
                        value={state.cardFields?.telephone}
                        onChange={onFieldChangeHandler}
                        type="text"
                      />
                    </Grid>
                  </Grid>
                </FormControl>
              </Container>

              <Container className={classes.fieldContainerRed}>
                <FormControl className={classes.margin}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <InputAdornment
                        position="start"
                        className={classes.adornment}
                      >
                        Wat is de datum op je kaart?
                      </InputAdornment>

                      <TextField
                        name="date"
                        id="input-with-icon-grid"
                        value={state.cardFields?.date}
                        onChange={onFieldChangeHandler}
                        type="text"
                      />
                    </Grid>
                  </Grid>
                </FormControl>
              </Container>

              <Container className={classes.fieldContainerGreen}>
                <FormControl className={classes.margin}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <InputAdornment
                        position="start"
                        className={classes.adornment}
                      >
                        Wat is het e-mail adres op je kaart?
                      </InputAdornment>

                      <TextField
                        name="email"
                        id="input-with-icon-grid"
                        value={state.cardFields?.email}
                        onChange={onFieldChangeHandler}
                        type="text"
                      />
                    </Grid>
                  </Grid>
                </FormControl>
              </Container>

              <Container className={classes.fieldContainerBlue}>
                <FormControl className={classes.margin}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <InputAdornment
                        position="start"
                        className={classes.adornment}
                      >
                        Heb je een link naar een afbeelding?
                      </InputAdornment>

                      <TextField
                        name="imageUrl"
                        id="input-with-icon-grid"
                        value={state.cardFields?.imageUrl}
                        onChange={onFieldChangeHandler}
                        label="http://"
                        type="text"
                      />
                    </Grid>
                  </Grid>
                </FormControl>
              </Container>
            </Container>
          </Container>
        </Container>

        <Button
          variant="contained"
          onClick={onCreateCard}
          style={{ marginBottom: 100, marginTop: 40 }}
        >
          maak kaart
        </Button>
      </MuiThemeProvider>
    </>
  );
}
