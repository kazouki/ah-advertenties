import React from "react";
import PropTypes from "prop-types";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
} from "@material-ui/core/styles";

import DndLayout from "../components/Editor/dndLayout";

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
      main: "#009be5",
      dark: "#006db3",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

theme = {
  ...theme,

  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c",
      },
    },
    MuiButton: {
      label: {
        textTransform: "initial",
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none",
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: "initial",
        margin: "0 16px",
        minWidth: 0,
        [theme.breakpoints.up("md")]: {
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854",
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    ...theme.mixins,
    toolbar: {
      minHeight: 48,
    },
  },
};

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh",
  },

  appContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  mainContent: {
    flex: 1,
    padding: "48px 36px 0",
    background: "#eaeff1",
  },
};

function Paperbase(props) {
  const { classes } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <div className={classes.appContent}>
          <main
            className={classes.mainContent}
            style={{
              background: "#00A0E2",
              overflowX: "hidden",
            }}
          >
            <DndLayout />
          </main>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Paperbase);
