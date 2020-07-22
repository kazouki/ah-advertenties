import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ahLogoWit from "../img/ahlogo4.png";

import Checkbox from "@material-ui/core/Checkbox";

import { useSelector } from "react-redux";
import { selectLayoutState } from "../../store/editor/selectors";

import styled from "styled-components";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles({
  root: {
    borderRadius: "5px",
    minWidth: 275,
    background: "linear-gradient(45deg, #10459f 30%, #3C78DF 90%)",

    //none|h-offset v-offset blur spread color |inset|initial|inherit;
    boxShadow: "-20px 80px 80px -30px black",
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
      // disableUnderline: "true",
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

const FloppyIcon = styled.div`
  width: 0;
  color: white;
  left: 0px;
  margin-top: -10px;
`;

export default function AHCard(props) {
  const [state, setState] = useState(props.initState);
  const layoutState = useSelector(selectLayoutState);

  const classes = useStyles();
  const CHARACTER_LIMIT = 200;

  const onFieldChangeHandler = (e) => {
    const newState = {
      ...state,
      ptexts: {
        ...state.ptexts,
        [props?.ptextId]: {
          ...state.ptexts[props?.ptextId],
          [e.target.name]: e.target.value,
        },
      },
    };
    setState(newState);
  };

  const onSaveToStoreHandler = () => {
    props.saveStateTo(state);
  };

  return (
    <Card className={classes.root} display="inline">
      <CardContent>
        {!props.editDisabled ? (
          <FloppyIcon className={classes.floppyicon}>
            <SaveIcon onClick={onSaveToStoreHandler} />
          </FloppyIcon>
        ) : null}

        <Typography className={classes.title} component={"span"} gutterBottom>
          <img className={classes.ahlogo} src={ahLogoWit} alt="" />
          Aangeboden
          <Checkbox
            name="aangeboden"
            value={
              props.editDisabled
                ? layoutState?.ptexts[props?.ptextId].aangeboden
                : state?.ptexts[props?.ptextId].aangeboden
            }
            onChange={onFieldChangeHandler}
            color="default"
            className={classes.checkbox}
            inputProps={{
              disabled: props.editDisabled,
            }}
          />
          Gevraagd
          <Checkbox
            name="gevraagd"
            value={
              props.editDisabled
                ? layoutState?.ptexts[props?.ptextId].gevraagd
                : state?.ptexts[props?.ptextId].gevraagd
            }
            onChange={onFieldChangeHandler}
            color="default"
            className={classes.checkbox}
            inputProps={{
              disabled: props.editDisabled,
            }}
          />
          <span className={classes.datumboxlabel}>Datum </span>
          <TextField
            name="datum"
            value={
              props.editDisabled
                ? layoutState?.ptexts[props?.ptextId].datum
                : state?.ptexts[props?.ptextId].datum
            }
            onChange={onFieldChangeHandler}
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
              disabled: props.editDisabled,
            }}
          />
        </Typography>
        <TextField
          name="title"
          value={
            props.editDisabled
              ? layoutState?.ptexts[props?.ptextId].title
              : state?.ptexts[props?.ptextId].title
          }
          onChange={onFieldChangeHandler}
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
            disabled: props.editDisabled,
          }}
        />
        <TextField
          name="description"
          value={
            props.editDisabled
              ? layoutState?.ptexts[props?.ptextId].description
              : state?.ptexts[props?.ptextId].description
          }
          onChange={onFieldChangeHandler}
          rows={6}
          rowsMax={6}
          // step="1"
          className={classes.textField}
          margin="dense"
          // Chalkduster // Brush Script MT // Comic Sans MS // papyrus // Trattatello // Apple Chancery
          InputProps={{
            style: { fontSize: 14, fontFamily: "Bradley Hand", marginLeft: 2 },
            disableUnderline: true,
            disabled: props.editDisabled,
            inputProps: {
              maxLength: CHARACTER_LIMIT,
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
            value={
              props.editDisabled
                ? layoutState?.ptexts[props?.ptextId].name
                : state?.ptexts[props?.ptextId].name
            }
            onChange={onFieldChangeHandler}
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
              disabled: props.editDisabled,
            }}
          />
          <span className={classes.phoneboxlabel}>Telefoon </span>
          <TextField
            name="telephone"
            value={
              props.editDisabled
                ? layoutState?.ptexts[props?.ptextId].telephone
                : state?.ptexts[props?.ptextId].telephone
            }
            onChange={onFieldChangeHandler}
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
              disabled: props.editDisabled,
            }}
          />
        </Typography>
        <Typography component={"span"}>
          <span className={classes.nameboxlabel}>E-mail </span>
          <TextField
            name="email"
            value={
              props.editDisabled
                ? layoutState?.ptexts[props?.ptextId].email
                : state?.ptexts[props?.ptextId].email
            }
            onChange={onFieldChangeHandler}
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
              disabled: props.editDisabled,
              inputProps: {
                maxLength: CHARACTER_LIMIT,
                className: classes.input,
              },
            }}
          />
        </Typography>
        <Typography component={"span"}>
          <span className={classes.footertext}>
            OM HET AANBOD ACTUEEL TE HOUDEN, WORDEN KAARTJES NA 14 DAGEN
            VERWIJDERD.
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
}
