import React from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { IProfileData } from "../pages/ProfilePage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ServiceCard: {
      height: "50px",
      width: "100%",
      maxWidth: "400px",
      display: "flex",
      flexDirection: "row",
      margin: "20px 0",
      justifyContent: "space-between",
      backgroundColor: "lightgray",
      border: "solid 1px gray",
      borderRadius: "10px",
      padding: "10px 20px",
    },
    ListContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

interface ServicesListProps {
  infos: IProfileData;
}

function ListServices(props: ServicesListProps) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h3">My services</Typography>
      <div className={classes.ListContainer}>
        <div className={classes.ServiceCard}>
          <Typography variant="body1">Trello</Typography>
          <Typography variant="body1">
            {props.infos.trelloLinked ? "Connected" : "Not connected"}
          </Typography>
        </div>
        <div>
          <Typography variant="body1">
            GitHub : {props.infos.githubLinked ? "Connected" : "Not connected"}
          </Typography>
        </div>
        <div>
          <Typography variant="body1">
            Twitter : {props.infos.twitterLinked ? "Connected" : "Not connected"}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default ListServices;
