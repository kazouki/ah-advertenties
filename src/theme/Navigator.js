import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import Computer from "@material-ui/icons/Computer";
import Folder from "@material-ui/icons/Folder";

import SettingsIcon from "@material-ui/icons/Settings";
import TextFieldsIcon from "@material-ui/icons/TextFields";

const categories = [
  {
    id: "...",
    children: [
      {
        id: "...",
        icon: <TextFieldsIcon />,
        targetUrl: "/component1",
        active: true,
      },
      { id: "...", icon: <DnsRoundedIcon />, targetUrl: "/sources" },
      {
        id: "...",
        icon: <Folder />,
        targetUrl: "/functions",
      },
    ],
  },
  {
    id: "...",
    children: [
      { id: "...", icon: <SettingsIcon />, targetUrl: "/card" },
      { id: "...", icon: <Computer />, targetUrl: "/api" },
    ],
  },
];

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    color: "rgba(255, 255, 255, 0.7)",
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: 16,
    paddingBottom: 16,
  },
  firebase: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white,
  },
  itemActionable: {
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  },
  itemActiveItem: {
    color: "#4fc3f7",
  },
  itemPrimary: {
    color: "inherit",
    fontSize: theme.typography.fontSize,
    "&$textDense": {
      fontSize: theme.typography.fontSize,
    },
  },
  textDense: {},
  divider: {
    marginTop: theme.spacing(2),
  },
});

function Navigator(props) {
  const { classes, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          className={classNames(
            classes.firebase,
            classes.item,
            classes.itemCategory
          )}
        >
          ...Logo
        </ListItem>

        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, targetUrl }) => (
              <ListItem
                button
                dense
                key={childId}
                component={Link}
                to={targetUrl}
                className={classNames(
                  classes.item,
                  classes.itemActionable,
                  active && classes.itemActiveItem
                )}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                    textDense: classes.textDense,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
