import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./DrawerComponent";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Navbar
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/login" className={classes.link}>
              Login
            </Link>
            <Link to="/register" className={classes.link}>
              Register
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
