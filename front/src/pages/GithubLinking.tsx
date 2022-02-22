import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  makeStyles,
  Theme,
  createStyles,
  Typography,
} from "@material-ui/core";
import Navbar from "../components/Navbar";
import myFetch from "../api/api";
import { IStatusResponse } from "../Interfaces";

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

function GithubLinking() {
  const classes = useStyles();
  const [status, setStatus] = useState("");

  async function validateOAuth () {
    try {
      const query = window.location.search;
      const params = new URLSearchParams(query);
      const data = {
        code: params.get("code"),
        state: params.get("state"),
      };

      const res: IStatusResponse = await myFetch<IStatusResponse>(
        "/services/github/validate",
        "POST",
        JSON.stringify(data)
      );
      if (res.status) {
        setStatus("GitHub account successfully linked, redirection in 3s.");
        setTimeout(function () {
          window.location.replace('/profile');
        }, 3000);
      } else {
        console.log("ERROR: ", res.error);
        setStatus(res.error!);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    validateOAuth();
  }, []);

  return (
    <CssBaseline>
      <Navbar />
      <div className="App">
        <div className={classes.Container}>
          <h1>Account Linking</h1>
          {status.length ? (
            <Typography variant="h5" gutterBottom={false}>
              {status}
            </Typography>
          ) : null}
        </div>
      </div>
    </CssBaseline>
  );
}

export default GithubLinking;
