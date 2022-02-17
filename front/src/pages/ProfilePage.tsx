import React from "react";
import {
  CssBaseline,
  makeStyles,
  Theme,
  createStyles,
  Typography,
} from "@material-ui/core";
import Navbar from "../components/Navbar";
import ListServices from "../components/ListServices";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Container: {
      height: "100%",
      width: "50%",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    Separator: {
      height: "1px",
      border: "1px solid lightgray",
      width: "100%",
      margin: "10px 0",
    },
  })
);

function ProfilePage() {
  const classes = useStyles();

  return (
    <CssBaseline>
      <Navbar />
      <div className="App">
        <div className={classes.Container}>
          <Typography variant="h2">Profile</Typography>
          <div className={classes.Separator} />
          <div>
            <Typography variant="h3">Account settings</Typography>
          </div>
          <div className={classes.Separator} />
          <ListServices />
        </div>
      </div>
    </CssBaseline>
  );
}

export default ProfilePage;
