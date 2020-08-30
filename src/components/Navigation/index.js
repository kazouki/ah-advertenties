import React, { useState } from "react";

import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
// import SearchIcon from "@material-ui/icons/Search";

import { Link } from "react-router-dom";

import ahLogoWit from "../../static/img/ahlogo4.png";
import { AH_BLUE } from "../../config/constants.js";
import { AH_BLUE_LIGHT } from "../../config/constants.js";

import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import { selectUser } from "../../store/user/selectors";
import { selectUnreadMessages } from "../../store/message/selectors";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import { useHistory } from "react-router-dom";
import { createCard } from "../../store/card/actions";
import { fetchInboxMessages } from "../../store/message/actions";
import { fetchUnreadMessageCount } from "../../store/message/actions";
import { fetchUserFavCards } from "../../store/card/actions";
import { logOut } from "../../store/user/actions";
import { getUserCards } from "../../store/user/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 5,
  },
  appbar: {
    height: 58,
    background: AH_BLUE,
  },
  homeButton: {
    display: "block",
    height: 45,
    marginRight: theme.spacing(2),
  },
  title: {
    marginTop: 7,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: "white",
  },

  menuItem: {
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: "white",
    margin: 8,
  },
  menuButtons: {
    display: "flex",
    position: "relative",
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    padding: 0,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,

    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const unreadMessages = useSelector(selectUnreadMessages);
  const history = useHistory();
  const dispatch = useDispatch();

  const onCreateCard = (e) => {
    dispatch(
      createCard({
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
      })
    );
    history.push("/");
  };

  function NewCardMenu() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      if (!user.token) {
        history.push("/login");
      } else setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button
          className={classes.menuItem}
          color="primary"
          style={{ background: AH_BLUE_LIGHT }}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Nieuwe kaart
        </Button>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link
            to={"/newcard"}
            style={{
              color: "black",
              textDecoration: "none",
            }}
          >
            <MenuItem onClick={handleClose}>kaart invullen</MenuItem>
          </Link>

          <MenuItem
            onClick={() => {
              handleClose();
              onCreateCard();
            }}
          >
            lege kaart
          </MenuItem>
        </Menu>
      </div>
    );
  }

  function MyCardsMenu() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      if (!user.token) {
        history.push("/login");
      } else setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button
          className={classes.menuItem}
          color="primary"
          style={{ background: AH_BLUE_LIGHT }}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Mijn kaarten
        </Button>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link
            to={"/favorites"}
            style={{
              color: "black",
              textDecoration: "none",
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                dispatch(fetchUserFavCards());
              }}
            >
              mijn favorieten
            </MenuItem>
          </Link>

          <Link
            to={"/mycards"}
            style={{
              color: "black",
              textDecoration: "none",
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                dispatch(getUserCards(user.id));
              }}
            >
              mijn kaarten
            </MenuItem>
          </Link>
        </Menu>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.appbar}>
        <Toolbar>
          <Link
            to={"/"}
            style={{ outline: "none" }}
            onClick={() => {
              if (user.id)
                dispatch(fetchUnreadMessageCount({ userId: user.id }));
            }}
          >
            <img className={classes.homeButton} src={ahLogoWit} alt="" />
          </Link>

          <Typography className={classes.title} variant="h5">
            Albert Heijn
          </Typography>
          <Typography variant="h6">Advertenties</Typography>
          <div className={classes.menuButtons}>
            <NewCardMenu />

            <MyCardsMenu />
          </div>

          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Zoeken…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div> */}
          {user.token ? (
            <Link
              style={{ color: "white", marginLeft: 10 }}
              to="/messages/all"
              onClick={() => {
                dispatch({ type: "RESET_REMOTE_USERNAME_AND_ID" });
                dispatch({ type: "LOAD_CONVERSATION", payload: [] });
                dispatch(fetchInboxMessages());
                if (user.id)
                  dispatch(fetchUnreadMessageCount({ userId: user.id }));
              }}
            >
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={unreadMessages} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Link>
          ) : null}
          {!token ? (
            <Link style={{ color: "white" }} to="/login">
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Link>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(logOut())}
            >
              <div style={{ marginLeft: 8 }}>
                <Typography
                  className={classes.menuItem}
                  style={{ fontSize: 11 }}
                >
                  Welkom terug
                </Typography>
                <Typography style={{ fontSize: 15, color: "white" }}>
                  <b>{user.name}</b>!
                </Typography>
              </div>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
