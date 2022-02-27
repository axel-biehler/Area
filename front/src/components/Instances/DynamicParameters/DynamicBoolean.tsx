import React, { useState } from "react";
import {
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Checkbox,
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
  })
);

function DynamicBoolean(props: IParameterProps) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  return (
    <div key={props.index} className={classes.Input}>
      <Typography variant="body1">{props.element.name}</Typography>
      <Checkbox
        checked={checked}
        onChange={() => {
          props.editParams(props.element, !checked);
          setChecked(!checked);
        }}
      />
    </div>
  );
}

export default DynamicBoolean;
