import React, {useCallback, useEffect, useState} from "react";
import { makeStyles, Theme, createStyles, TextField } from "@material-ui/core";
import {
  IDropdownListItem,
  IEventListItem,
  IInstanceRequest,
  IParameter,
  IParameterProps,
  IWidget,
} from "../../../Interfaces";
import Select, { SingleValue } from "react-select";
import myFetch from "../../../api/api";

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

function DynamicOptions(props: IParameterProps) {
  const classes = useStyles();
  const [options, setOptions] = useState<IDropdownListItem[] | undefined>(
    undefined
  );

  const initialize = useCallback(async () => {
    const res: IParameter[] = await myFetch<IParameter[]>(
      props.element.route!,
      "GET"
    );
    const opt: IDropdownListItem[] = Array.from(res, (x: IParameter) => {
      return {
        name: props.element.name,
        label: x.name,
        value: x.value,
        type: x.type,
      };
    });
    setOptions(opt);
  }, [props.element.name, props.element.route]);

  useEffect(() => {
    initialize();
  }, [initialize]);

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

export default DynamicOptions;
