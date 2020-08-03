import React, { useState, useEffect } from "react";

import { signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import Container from "@material-ui/core/Container";

import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";

import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";

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
}));

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  const [submitNameOff, setSubmitNameOff] = useState(true);
  const [submitEmailOff, setSubmitEmailOff] = useState(true);
  const [submitPasswordOff, setSubmitPasswordOff] = useState(true);

  const [submitOff, setSubmitOff] = useState(true);

  const [nameAlert, setNameAlert] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const [passwordAlert, setPasswordAlert] = useState("");
  const [passwordTwoAlert, setPasswordTwoAlert] = useState("");

  const [showPassword, setShowPassword] = useState();
  const [showPasswordTwo, setShowPasswordTwo] = useState();

  const classes = useStyles();

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(signUp(name, email, password));

    setEmail("");
    setPassword("");
    setName("");
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // ###### optionals
  // const handleClickShowPasswordTwo = () => {
  //   setShowPasswordTwo(!showPasswordTwo);
  // };

  // const handleMouseDownPasswordTwo = (event) => {
  //   event.preventDefault();
  // };

  const onSetName = (e) => {
    setName(e.target.value);

    if (e.target.value.length < 2) {
      setNameAlert(
        <b>
          <h5>Je naam moet minimaal twee letters bevatten!</h5>
        </b>
      );
      setSubmitNameOff(true);
    } else if (e.target.value.length > 15) {
      setNameAlert(
        <b>
          <h5>Je naam mag maximaal 15 letters bevatten!</h5>
        </b>
      );
      setSubmitNameOff(true);
    } else {
      setSubmitNameOff(false);
      setNameAlert("");
    }

    if (submitNameOff || submitEmailOff || submitPasswordOff)
      setSubmitOff(true);
    if (!submitNameOff && !submitEmailOff && !submitPasswordOff)
      setSubmitOff(false);

    if (!e.target.value) setNameAlert("");
  };

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const onSetEmail = (e) => {
    setEmail(e.target.value);
    const valid = validateEmail(email);

    if (!valid) {
      setEmailAlert(
        <b>
          <h5>Email is onjuist!</h5>
        </b>
      );
      setSubmitEmailOff(true);
    } else {
      setSubmitEmailOff(false);
      setEmailAlert("");
    }

    if (submitNameOff || submitEmailOff || submitPasswordOff)
      setSubmitOff(true);
    if (!submitNameOff && !submitEmailOff && !submitPasswordOff)
      setSubmitOff(false);

    if (!e.target.value) setEmailAlert("");
  };

  const onSetPassword = (e) => {
    const pw = e.target.value;
    setPassword(pw);

    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (!pw.match(passw)) {
      setSubmitPasswordOff(true);
      setPasswordAlert("password not safe enough!");
    } else {
      setSubmitPasswordOff(false);
      setPasswordAlert("");
    }
    if (submitNameOff || submitEmailOff || submitPasswordOff)
      setSubmitOff(true);
    if (!submitNameOff && !submitEmailOff && !submitPasswordOff)
      setSubmitOff(false);

    if (!e.target.value) setPasswordAlert("");
  };

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Container
          style={{
            width: "98%",
            height: "70vw",
            background: "rgb(48,194,255, 0.04)",
            paddingTop: 70,
            marginTop: 40,
          }}
        >
          <Container
            style={{
              width: "50%",
              height: "40%",
              minWidth: "400px",
              minHeight: "400px",
              background: "white",
              paddingTop: 20,
              borderRadius: 10,
            }}
          >
            <Container style={{ marginTop: 0 }}>
              <Container>
                <FormControl className={classes.margin}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <AccountCircle style={{ color: AH_BLUE }} />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="input-with-icon-grid"
                        label="Naam"
                        value={name}
                        onChange={onSetName}
                      />
                    </Grid>
                  </Grid>
                </FormControl>
                {nameAlert}
              </Container>

              <Container>
                <FormControl className={classes.margin}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <AccountCircle style={{ color: AH_BLUE }} />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="input-with-icon-gridTwo"
                        label="E-mail"
                        value={email}
                        onChange={onSetEmail}
                      />
                    </Grid>
                  </Grid>
                </FormControl>
                {emailAlert}
              </Container>

              <Container style={{ marginTop: 20 }}>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Wachtwoord
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={onSetPassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <Visibility style={{ color: AH_BLUE }} />
                          ) : (
                            <VisibilityOff style={{ color: AH_BLUE }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Container>
              {passwordAlert}
              {/* ###### optionals */}
              {/* <Container style={{ marginTop: 20 }}>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="standard-adornment-passwordTwo">
                    Herhaal wachtwoord
                  </InputLabel>
                  <Input
                    id="standard-adornment-passwordTwo"
                    type={showPasswordTwo ? "text" : "password"}
                    value={passwordTwo}
                    onChange={onSetPasswordTwo}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordTwo}
                          onMouseDown={handleMouseDownPasswordTwo}
                        >
                          {showPasswordTwo ? (
                            <Visibility style={{ color: AH_BLUE }} />
                          ) : (
                            <VisibilityOff style={{ color: AH_BLUE }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Container>
              {passwordTwoAlert} */}

              <Container>
                <Button
                  variant="contained"
                  style={{ color: AH_BLUE, background: "white", marginTop: 30 }}
                  type="submit"
                  disabled={submitOff}
                  onClick={submitForm}
                >
                  inschrijven
                </Button>
              </Container>
            </Container>
          </Container>
        </Container>
      </MuiThemeProvider>
    </>
  );
}
