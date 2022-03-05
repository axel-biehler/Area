import React, { useState } from "react";
import { makeStyles, Theme, createStyles, TextField } from "@material-ui/core";
import {
  IDropdownListItem,
  IEventListItem,
  IParameter,
  IParameterProps,
  IWidget,
} from "../../../Interfaces";
import Select, { SingleValue } from "react-select";

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
    Select: {
      width: "90%",
      margin: "10px auto",
    },
  })
);

function DynamicDropdown(props: IParameterProps) {
  const classes = useStyles();
  const options: IDropdownListItem[] = Array.from(
    props.element.options!,
    (x: IParameter) => {
      return {
        name: props.element.name,
        label: x.name,
        value: x.value,
        type: x.type,
      };
    }
  );

  return (
    <div key={props.index} className={classes.Input}>
      <Select
        placeholder={
          props.element.placeholder! +
          (props.element.isOptional !== true ? " *" : "")
        }
        className={classes.Select}
        isSearchable={true}
        onChange={(choice: SingleValue<IDropdownListItem>) => {
          if (choice === null) {
            return;
          }
          props.editParams(
            { name: choice.name, type: choice.type },
            choice.value
          );
        }}
        name="color"
        options={options}
      />
    </div>
  );
}

export default DynamicDropdown;
