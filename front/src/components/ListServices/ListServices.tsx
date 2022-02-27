import React from "react";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from "@material-ui/core";
import "./ListServices.css";
import GithubLogo from "../../assets/GithubLogo.png";
import TrelloLogo from "../../assets/TrelloLogo.png";
import TwitterLogo from "../../assets/TwitterLogo.png";
import myFetch from "../../api/api";
import {
  IGithubEnv,
  IProfileData,
  IProfileProps,
  IStatusResponse,
  ITrelloOAuth,
  ITwitterOAuth,
} from "../../Interfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Title: {
      margin: "30px auto",
    },
    Card: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "white",
      // backgroundColor: "#4fc3f7ff",
      width: "600px",
      height: "110px",
      marginBottom: "20px",
    },
    CardContent: {
      flex: "1 0 auto",
    },
    CardMedia: {
      width: "50%",
      padding: "20px",
      objectFit: "contain",
    },
  })
);

function ListServices(props: IProfileProps) {
  const classes = useStyles();

  const githubOAuth = async () => {
    if (props.infos.githubLinked) {
      const res: IStatusResponse = await myFetch<IStatusResponse>(
        "/services/github/unlink",
        "GET"
      );
      if (res.status) {
        const newInfos: IProfileData = {
          username: props.infos.username,
          email: props.infos.email,
          twitterLinked: props.infos.twitterLinked,
          githubLinked: false,
          trelloLinked: props.infos.trelloLinked,
        };
        props.setInfos(newInfos);
      } else {
        console.log("ERROR: ", res.error);
      }
    } else {
      const res: IGithubEnv = await myFetch<IGithubEnv>(
        "/services/github/env",
        "GET"
      );
      const url: string = `https://github.com/login/oauth/authorize?client_id=${res.clientId}&state=${res.state}&scope=${res.scope}`;
      window.location.replace(url);
    }
  };

  const trelloOAuth = async () => {
    if (props.infos.trelloLinked) {
      const res: IStatusResponse = await myFetch<IStatusResponse>(
        "/services/trello/unlink",
        "GET"
      );
      if (res.status) {
        const newInfos: IProfileData = {
          username: props.infos.username,
          email: props.infos.email,
          twitterLinked: props.infos.twitterLinked,
          githubLinked: props.infos.githubLinked,
          trelloLinked: false,
        };
        props.setInfos(newInfos);
      } else {
        console.log("ERROR: ", res.error);
      }
    } else {
      const res: ITrelloOAuth = await myFetch<ITrelloOAuth>(
        "/services/trello/connect",
        "POST",
        JSON.stringify({ callback: "http://localhost:8081/trello/link" })
      );
      if (res.status) {
        window.location.replace(res.redirectUrl!);
      } else {
        console.log("ERROR: ", res.error);
      }
    }
  };

  const twitterOAuth = async () => {
    if (props.infos.twitterLinked) {
      const res: IStatusResponse = await myFetch<IStatusResponse>(
        "/services/twitter/unlink",
        "GET"
      );
      if (res.status) {
        const newInfos: IProfileData = {
          username: props.infos.username,
          email: props.infos.email,
          twitterLinked: false,
          githubLinked: props.infos.githubLinked,
          trelloLinked: props.infos.trelloLinked,
        };
        props.setInfos(newInfos);
      } else {
        console.log("ERROR: ", res.error);
      }
    } else {
      console.log("ici");
      const res: ITwitterOAuth = await myFetch<ITwitterOAuth>(
        "/services/twitter/connect",
        "POST",
        JSON.stringify({ callback: "http://localhost:8081/twitter/link" })
      );
      console.log("ici2");
      if (res.status) {
        console.log("ici good");
        const url = `https://api.twitter.com/oauth/authorize?oauth_token=${res.oauthToken}`;
        window.location.replace(url);
      } else {
        console.log("ici caca");
        console.log("ERROR: ", res.error);
      }
    }
  };

  return (
    <div>
      <Typography variant="h3" className={classes.Title}>My services</Typography>
      <div className="ListContainer">
        <Card className={classes.Card}>
          <CardMedia
            component={"img"}
            className={classes.CardMedia}
            src={GithubLogo}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "50%",
              padding: "1%",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size={"medium"}
              onClick={githubOAuth}
            >
              {props.infos.githubLinked ? "Revoke access" : "Link account"}
            </Button>
          </Box>
        </Card>

        <Card className={classes.Card}>
          <CardMedia
            component={"img"}
            className={classes.CardMedia}
            src={TrelloLogo}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "50%",
              padding: "1%",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size={"medium"}
              onClick={trelloOAuth}
            >
              {props.infos.trelloLinked ? "Revoke access" : "Link account"}
            </Button>
          </Box>
        </Card>

        <Card className={classes.Card}>
          <CardMedia
            component={"img"}
            className={classes.CardMedia}
            src={TwitterLogo}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "50%",
              padding: "1%",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size={"medium"}
              onClick={twitterOAuth}
            >
              {props.infos.twitterLinked ? "Revoke access" : "Link account"}
            </Button>
          </Box>
        </Card>
      </div>
    </div>
  );
}

export default ListServices;
