import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import { blue } from "@material-ui/core/colors";
// import BluePaper from "../img/old-blue-paper.jpg";
import ahLogoWit from "../img/ahlogo4.png";

import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles({
  root: {
    borderRadius: "5px",
    minWidth: 275,
    background: `linear-gradient(45deg, #10459f 30%, #3C78DF 90%)`,
    //none|h-offset v-offset blur spread color |inset|initial|inherit;
    boxShadow: "-20px 50px 80px -30px black",
    // background: `url(${BluePaper}) repeat`,
    display: "block",
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
    marginLeft: -2,
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
  datumboxlabel: {
    position: "relative",
    top: "-1px",
    left: 5,
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

  datumbox: {
    position: "relative",
    borderRadius: "5px",
    background: "white",
    height: 20,
    top: 9,
    left: 11,
    // marginTop: 2,
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
      disableUnderline: "true",
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
    height: "30px",
    width: "40px",
    marginRight: 10,
  },
});

export default function AHCard(props) {
  const [description, setDescription] = useState("");
  const classes = useStyles();
  const CHARACTER_LIMIT = 20;

  return (
    <Card className={classes.root} display="inline">
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {/* <span
            {...props.provided.dragHandleProps}
            ref={props.provided.innerRef}
          > */}
          <img className={classes.ahlogo} src={ahLogoWit} alt="" />
          {/* </span> */}
          Aangeboden
          <Checkbox color="default" className={classes.checkbox} />
          Gevraagd
          <Checkbox color="default" className={classes.checkbox} />
          <span className={classes.datumboxlabel}>Datum </span>
          <TextField
            margin="dense"
            rows={1}
            rowsMax={1}
            className={classes.datumbox}
            InputProps={{
              style: {
                fontSize: 10,
                fontFamily: "Bradley Hand",
                marginLeft: 4,
                marginTop: 2,
              },
              disableUnderline: true,
            }}
          />
        </Typography>
        <TextField
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
          }}
        />
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          rowsMax={6}
          step="1"
          className={classes.textField}
          margin="dense"
          // Chalkduster // Brush Script MT // Comic Sans MS // papyrus // Trattatello // Apple Chancery
          InputProps={{
            style: { fontSize: 14, fontFamily: "Bradley Hand", marginLeft: 2 },
            disableUnderline: true,
            inputProps: {
              maxlength: CHARACTER_LIMIT,
              className: classes.input,
            },
          }}
          type="text"
          multiline
          fullWidth
        />
        <Typography>
          <span className={classes.nameboxlabel}>Naam </span>
          <TextField
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
            }}
          />
          <span className={classes.phoneboxlabel}>Telefoon </span>
          <TextField
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
            }}
          />
        </Typography>
        <Typography>
          <span className={classes.nameboxlabel}>E-mail </span>
          <TextField
            disableUnderline={true}
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
              inputProps: {
                maxlength: CHARACTER_LIMIT,
                className: classes.input,
              },
            }}
          />
        </Typography>
        <Typography>
          <span className={classes.footertext}>
            OM HET AANBOD ACTUEEL TE HOUDEN, WORDEN KAARTJES NA 14 DAGEN
            VERWIJDERD.
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
}
