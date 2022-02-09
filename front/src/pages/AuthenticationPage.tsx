import React, { useState } from "react";
import {
  CssBaseline,
  makeStyles,
  Theme,
  createStyles,
  Button,
  Typography,
} from "@material-ui/core";
import ModalAuth from "../components/ModalAuth";
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
      margin: "auto auto 20px auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
  })
);

function AuthenticationPage() {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [requestType, setRequestType] = useState(false);

  const openLogin = () => {
    setRequestType(true);
    setOpen(true);
  };

  const openRegister = () => {
    setRequestType(false);
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
            <Button variant="contained" color="primary" onClick={openLogin}>
              Signup
            </Button>
            <Button variant="contained" color="primary" onClick={openRegister}>
              Register
            </Button>
          </div>
          <ModalAuth open={open} handleClose={handleClose} isLogin={requestType} setError={setError} />
          {error.length ? <Typography variant="h5" gutterBottom={false}> {error} </Typography> : null}
        </div>
      </div>
    </CssBaseline>
  );
}

export default AuthenticationPage;
