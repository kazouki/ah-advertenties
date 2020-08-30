import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

// import { selectCards } from "../../store/card/selectors";
import { selectUserCards } from "../../store/user/selectors";
import { selectUserFavorites } from "../../store/card/selectors";

import ahLogoWit from "../../static/img/ahlogo4.png";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { AH_BLUE } from "../../config/constants";

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
  cardRoot: {
    borderRadius: "5px",
    minWidth: 275,
    background: "linear-gradient(45deg, #10459f 30%, #3C78DF 90%)",

    //none|h-offset v-offset blur spread color |inset|initial|inherit;
    boxShadow: "-20px 80px 80px -30px black",

    width: "420px",
    height: "280px",
    transitionDuration: "0.3s",
  },
  title: {
    position: "relative",
    fontSize: 12,
    color: "white",
    marginBottom: -10,
    marginTop: -10,
    marginLeft: 0,
  },
  footertext: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: "6px",
    marginLeft: "12px",
    fontSize: 8,
    color: "white",
  },
  floppyicon: {
    display: "flex",
    position: "relative",
    top: -5,
    marginLeft: 370,
    marginBottom: -15,
  },
  checkbox: {
    color: "white",
    marginBottom: 2,
    marginLeft: -6,
  },
  nameboxlabel: {
    position: "relative",
    top: "-2px",
    fontSize: 10,
    color: "white",
  },
  dateboxlabel: {
    position: "relative",
    top: "0px",
    marginRight: -5,
    left: 0,
    fontSize: 10,
    color: "white",
  },
  phoneboxlabel: {
    position: "relative",
    top: "-2px",
    fontSize: 10,
    color: "white",
    marginLeft: 4,
    marginRight: 2,
  },

  datebox: {
    position: "relative",
    borderRadius: "5px",
    background: "white",
    height: 20,
    top: 9,
    left: 9,
    marginLeft: 1,
    marginBottom: 2,
    width: "103px",
    input: {
      color: "black",
    },
  },
  namebox: {
    borderRadius: "5px",
    background: "white",
    height: 20,
    marginTop: 2,
    marginLeft: 1,
    marginBottom: 2,
    width: "153px",
    input: {
      color: "black",
    },
  },
  emailbox: {
    borderRadius: "5px",
    background: "white",
    marginTop: 0,
    height: 20,
    width: "356px",
    input: {
      color: "black",
    },
  },
  textField: {
    borderRadius: "5px",
    background: "white",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 0,
    marginBottom: 0,
    marginTop: 2,
    fontWeight: 500,
  },
  input: {
    color: "black",
  },
  ahlogo: {
    marginTop: -5,
    height: "30px",
    width: "40px",
    marginRight: 10,
    right: 0,
  },
}));

export default function DisplayCard(props) {
  const classes = useStyles();
  const userCards = useSelector(selectUserCards);
  const userFavorites = useSelector(selectUserFavorites);

  const displayCards = props.mode === "myCards" ? userCards : userFavorites;
  console.log("displayCards", displayCards);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <span style={{ color: AH_BLUE, fontSize: 25 }}>
              {props.mode === "myCards" ? (
                <b>JOUW KAARTEN</b>
              ) : (
                <b>JOUW FAVORIETEN</b>
              )}
            </span>
          </Paper>
        </Grid>
      </Grid>

      {displayCards?.map((card) => {
        return (
          <>
            <Paper className={classes.paper} key={card.id}>
              <Card className={classes.cardRoot} display="inline">
                <CardContent>
                  <Typography
                    className={classes.title}
                    component={"span"}
                    gutterBottom
                  >
                    <img className={classes.ahlogo} src={ahLogoWit} alt="" />
                    Aangeboden
                    <Checkbox
                      name="aangeboden"
                      checked={card?.aangeboden}
                      color="default"
                      className={classes.checkbox}
                      inputProps={{
                        disabled: true,
                      }}
                    />
                    Gevraagd
                    <Checkbox
                      name="gevraagd"
                      checked={card?.gevraagd}
                      color="default"
                      className={classes.checkbox}
                      inputProps={{
                        disabled: true,
                      }}
                    />
                    <span className={classes.dateboxlabel}>datum </span>
                    <TextField
                      name="date"
                      value={card?.date}
                      margin="dense"
                      rows={1}
                      rowsMax={1}
                      className={classes.datebox}
                      InputProps={{
                        style: {
                          fontSize: 10,
                          fontFamily: "Bradley Hand",
                          marginLeft: 4,
                          marginTop: 2,
                        },
                        disableUnderline: true,
                        disabled: true,
                      }}
                    />
                  </Typography>
                  <TextField
                    name="title"
                    value={card?.title}
                    margin="dense"
                    rows={1}
                    rowsMax={1}
                    className={classes.textField}
                    InputProps={{
                      style: {
                        fontSize: 14,
                        fontFamily: "Bradley Hand",
                        marginLeft: 2,
                        marginTop: 3,
                      },
                      disableUnderline: true,
                      disabled: true,
                    }}
                  />
                  <TextField
                    name="description"
                    value={card?.description}
                    rows={6}
                    rowsMax={6}
                    className={classes.textField}
                    margin="dense"
                    // Chalkduster // Brush Script MT // Comic Sans MS // papyrus // Trattatello // Apple Chancery
                    InputProps={{
                      style: {
                        fontSize: 14,
                        fontFamily: "Bradley Hand",
                        marginLeft: 2,
                      },
                      disableUnderline: true,
                      disabled: true,
                      inputProps: {
                        className: classes.input,
                      },
                    }}
                    multiline
                    fullWidth
                  />
                  <Typography component={"span"}>
                    <span className={classes.nameboxlabel}>Naam </span>
                    <TextField
                      name="name"
                      value={card?.name}
                      margin="dense"
                      rows={1}
                      rowsMax={1}
                      className={classes.namebox}
                      InputProps={{
                        style: {
                          fontSize: 10,
                          fontFamily: "Bradley Hand",
                          marginLeft: 4,
                          marginTop: 2,
                        },
                        disableUnderline: true,
                        disabled: true,
                      }}
                    />
                    <span className={classes.phoneboxlabel}>Telefoon </span>
                    <TextField
                      name="telephone"
                      value={card?.telephone}
                      margin="dense"
                      rows={1}
                      rowsMax={1}
                      className={classes.namebox}
                      InputProps={{
                        style: {
                          fontSize: 10,
                          fontFamily: "Bradley Hand",
                          marginLeft: 4,
                          marginTop: 2,
                        },
                        disableUnderline: true,
                        disabled: true,
                      }}
                    />
                  </Typography>
                  <Typography component={"span"}>
                    <span className={classes.nameboxlabel}>E-mail </span>
                    <TextField
                      name="email"
                      value={card?.email}
                      margin="dense"
                      rows={1}
                      rowsMax={1}
                      className={classes.emailbox}
                      InputProps={{
                        style: {
                          fontSize: 10,
                          fontFamily: "Bradley Hand",
                          marginLeft: 4,
                          marginTop: 2,
                        },
                        disableUnderline: true,
                        disabled: true,
                        inputProps: {
                          className: classes.input,
                        },
                      }}
                    />
                  </Typography>
                  <Typography component={"span"}>
                    <span className={classes.footertext}>
                      OM HET AANBOD ACTUEEL TE HOUDEN, WORDEN KAARTJES NA 14
                      DAGEN VERWIJDERD.
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </>
        );
      })}
    </div>
  );
}
