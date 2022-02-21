import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from "@material-ui/core";
import "./ListServices.css";
import { IProfileData } from "../../pages/ProfilePage";
import GithubLogo from "../../assets/GithubLogo.png";

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

interface ServicesListProps {
  infos: IProfileData;
}

function ListServices(props: ServicesListProps) {
  const classes = useStyles();

  const githubOAuth = () => {
    if (props.infos.githubLinked) {
      console.log("revoke token");
    } else {
      console.log("link account");
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
              padding: "1%"
            }}
          >
            <Typography component="div" variant="h5">
              GitHub service
            </Typography>
            <Button variant="contained" color="primary" size={"medium"} onClick={githubOAuth}>
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
