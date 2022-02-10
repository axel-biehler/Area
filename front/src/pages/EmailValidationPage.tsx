import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import Navbar from "../components/Navbar";
import { setToken } from "../api/auth";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Container: {
      height: "100%",
      width: "100%",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  })
);

function EmailValidationPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const url = "http://localhost:8080/auth/verifyEmail/" + window.location.href.slice(window.location.href.lastIndexOf("/") + 1, window.location.href.length);
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async function (response: any) {
        const resBody = await response.json();
        if (!resBody.status) {
          console.log("ERROR: ", resBody.error);
        } else {
          setToken(resBody.token);
          navigate("/home");
        }
      })
      .catch((err) => console.error(err));
  });

  return (
    <CssBaseline>
      <Navbar />
      <div className="App">
        <div className={classes.Container}>
          <h1>Email Validation</h1>
        </div>
      </div>
    </CssBaseline>
  );
}

export default EmailValidationPage;
