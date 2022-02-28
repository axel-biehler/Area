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

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getServiceName() {
  if (window.location.toString().indexOf("twitter") !== -1) {
    return "twitter";
  } else if (window.location.toString().indexOf("trello") !== -1) {
    return "trello";
  } else if (window.location.toString().indexOf("github") !== -1) {
    return "github";
  } else {
    return undefined;
  }
}

function getData(service: string) {
  const params = new URLSearchParams(window.location.search);

  if (service === "twitter") {
    return {
      oauthToken: params.get("oauth_token"),
      oauthVerifier: params.get("oauth_verifier"),
    };
  } else if (service === "trello") {
    return {
      oauthToken: params.get("oauth_token"),
      oauthVerifier: params.get("oauth_verifier"),
    };
  } else if (service === "github") {
    return {
      code: params.get("code"),
      state: params.get("state"),
    };
  }
}

function ServiceLinkingPage() {
  const classes = useStyles();
  const [status, setStatus] = useState("");

  async function validateOAuth() {
    try {
      const service: string | undefined = getServiceName();
      if (service === undefined) {
        return;
      }
      const data = getData(service);
      const url =
        service === "github"
          ? `/services/${service}/validate`
          : `/services/${service}/link`;
      const res: IStatusResponse = await myFetch<IStatusResponse>(
        url,
        "POST",
        JSON.stringify(data)
      );
      if (res.status) {
        setStatus(
          `${capitalizeFirstLetter(
            service
          )} account successfully linked, redirection in 3s.`
        );
        setTimeout(function () {
          window.location.replace("/profile");
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

export default ServiceLinkingPage;