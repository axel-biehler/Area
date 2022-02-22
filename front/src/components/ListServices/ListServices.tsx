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
import myFetch from "../../api/api";
import {
  IGithubEnv, IProfileData,
  IServicesListProps,
  IStatusResponse,
} from "../../Interfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Card: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "#4fc3f7ff",
      maxWidth: "800px",
      maxHeight: "200px",
    },
    CardContent: {
      flex: "1 0 auto",
    },
    CardMedia: {
      width: "50%",
      padding: "20px",
    },
  })
);

function ListServices(props: IServicesListProps) {
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

  return (
    <div>
      <Typography variant="h3">My services</Typography>
      <div className="ListContainer">
        <Card className={classes.Card}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "50%",
              padding: "1%",
            }}
          >
            <Typography component="div" variant="h5">
              GitHub service
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size={"medium"}
              onClick={githubOAuth}
            >
              {props.infos.githubLinked ? "Revoke access" : "Link account"}
            </Button>
          </Box>
          <CardMedia
            component={"img"}
            className={classes.CardMedia}
            src={GithubLogo}
          />
        </Card>
      </div>
    </div>
  );
}

export default ListServices;
