import React, { useState } from "react";
import {
  CssBaseline,
  makeStyles,
  Theme,
  createStyles,
  Button,
  AppBar,
  Typography,
} from "@material-ui/core";
import ModalLogin from "../components/ModalLogin";
import Navbar from "../components/Navbar";

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
    Container: {
      height: "100%",
      width: "100%",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    LoginForm: {
      width: "300px",
      margin: "auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
  })
);

function LoginPage() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  // function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CssBaseline>
      <Navbar />
      <div className="App">
        <div className={classes.Container}>
          <Typography variant="h4" gutterBottom={true}>Welcome to the AREA !</Typography>
          <div className={classes.LoginForm}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Signup
            </Button>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Register
            </Button>
          </div>
          <ModalLogin open={open} handleClose={handleClose} />
        </div>
      </div>
    </CssBaseline>
  );
}

export default LoginPage;
