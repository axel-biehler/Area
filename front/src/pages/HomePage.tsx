import React, { useState } from "react";
import {
  CssBaseline,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import Navbar from "../components/Navbar";

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

function HomePage() {
  const classes = useStyles();

  return (
    <CssBaseline>
      <Navbar />
      <div className="App">
        <div className={classes.Container}>
          <h1>Home Page</h1>
        </div>
      </div>
    </CssBaseline>
  );
}

export default HomePage;
