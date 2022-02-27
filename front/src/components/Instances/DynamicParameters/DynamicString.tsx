import React, { useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  TextField,
} from "@material-ui/core";
import { IParameterProps } from "../../../Interfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Input: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      justifyItems: "center",
    },
    Field: {
      margin: "5px 0",
    },
  })
);

function DynamicString(props: IParameterProps) {
  const classes = useStyles();
  const [str, setStr] = useState("");

  return (
    <div key={props.index} className={classes.Input}>
      <TextField
        className={classes.Field}
        label={props.element.name}
        placeholder={props.element.placeholder}
        variant="standard"
        value={str}
        onChange={(e) => {
          props.editParams(props.element, e.target.value);
          setStr(e.target.value);
        }}
      />
    </div>
  );
}

export default DynamicString;
