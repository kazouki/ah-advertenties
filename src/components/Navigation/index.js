import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";

import { Link } from "react-router-dom";

import ahLogoWit from "../../static/img/ahlogo4.png";
import { AH_BLUE } from "../../config/constants.js";

import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    display: "block",
    height: 45,
    marginRight: theme.spacing(2),
  },
  title: {
    marginTop: 7,
    // flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: "white",
  },
  titleExtension: {
    // marginTop: 4,
    // fontSize: 17,
  },
  menuItem: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: "white",
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

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: AH_BLUE }}>
        <Toolbar>
          <Link to={"/"}>
            <img className={classes.homeButton} src={ahLogoWit} alt="" />
          </Link>

          <Typography className={classes.title} variant="h5" noWrap>
            Albert Heijn
          </Typography>
          <Typography className={classes.titleExtension} variant="h6" noWrap>
            Advertenties
          </Typography>
          <Typography className={classes.menuItem} noWrap>
            Nieuwe Kaart
          </Typography>
          <Typography className={classes.menuItem} noWrap>
            Mijn Favorieten
          </Typography>
          <Typography className={classes.menuItem} noWrap>
            link3
          </Typography>
          <Typography className={classes.menuItem} noWrap>
            link4
          </Typography>

          <div className={classes.search}>
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
          </div>

          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
            <Link to="/profile">
              <IconButton color="inherit" className={classes.iconButtonAvatar}>
                <Avatar
                  className={classes.avatar}
                  src="https://material-ui.com/static/images/avatar/7.jpg"
                />
              </IconButton>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

//##################################

// import React from "react";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectToken } from "../../store/user/selectors";
// import NavbarItem from "./NavbarItem";
// import LoggedIn from "./LoggedIn";
// import LoggedOut from "./LoggedOut";

// export default function Navigation() {
//   const token = useSelector(selectToken);

//   const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

//   return (
//     <Navbar bg="light" expand="lg">
//       <Navbar.Brand as={NavLink} to="/">
//         ah logo
//       </Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav style={{ width: "100%" }} fill>
//           <NavbarItem path="/" linkText="Home" />
//           {loginLogoutControls}
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// }
