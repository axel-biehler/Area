import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#f9f9f9",
      fontFamily: "Roboto",
    },
    navlinks: {
      marginLeft: theme.spacing(3),
      display: "flex",
    },
    logo: {
      lineHeight: "100%",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
      marginLeft: theme.spacing(2),
      "&:hover": {
        color: "gray",
      },
    },
  })
);

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Navbar
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/home" className={classes.link}>
              Home
            </Link>
            <Link to="/auth" className={classes.link}>
              Authenticate
            </Link>
          </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
