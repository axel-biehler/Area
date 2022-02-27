import React, { Fragment, useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  Box,
} from "@material-ui/core";
import {
  IServiceChoiceProps,
  IParameter,
  IServiceListItem,
  IEventListItem,
  IInstanceConfig,
  IWidget,
} from "../../Interfaces";
import Select, { SingleValue } from "react-select";
import ListParams from "./ListParams";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Card: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "white",
      width: "600px",
      maxWidth: "80%",
      marginBottom: "20px",
    },
    Select: {
      maxHeight: "50%",
      margin: "10px 0px",
    }
  })
);

function getDefaultValue(type: string) {
  if (type === "boolean") {
    return false;
  } else if (type === "string") {
    return "";
  } else {
    return 0;
  }
}

function setEventChoice(
  choice: IEventListItem,
  setConfig: React.Dispatch<React.SetStateAction<IInstanceConfig | undefined>>,
  setChosenEvent: React.Dispatch<React.SetStateAction<IEventListItem | undefined>>,
  chosenService: IServiceListItem,
  props: IServiceChoiceProps,
) {
  setChosenEvent(choice);
  const actionParams = Array.from(choice.parameters, (x: IParameter) => {
    return {
      name: x.name,
      type: x.type,
      value: getDefaultValue(x.type),
    };
  });

  const config: IInstanceConfig = {
    name: choice.value,
    serviceName: chosenService!.value,
    displayName: choice.label,
    webhookId: props.type === "action" ? "ffefefef" : undefined,
    params: actionParams,
  };
  setConfig(config);
  props.editInstance(props.type, config);
}

function ServiceChoice(props: IServiceChoiceProps) {
  const classes = useStyles();
  const [config, setConfig] = useState<IInstanceConfig | undefined>(undefined);
  const [events, setEvents] = useState<IEventListItem[]>([]);
  const [chosenService, setChosenService] = useState<
    IServiceListItem | undefined
  >(undefined);
  const [chosenEvent, setChosenEvent] = useState<IEventListItem | undefined>(
    undefined
  );

  const setServiceChoice = (choice: IServiceListItem) => {
    const newWidgets = Array.from(choice.widgets, (x: IWidget) => {
      return {
        value: x.name,
        label: x.displayName,
        description: x.description,
        parameters: x.params,
      };
    });
    setChosenService(choice);
    setEvents(newWidgets);
  };

  const editActionParams = (edit: IParameter, value: any) => {
    const modifiedConfig: IInstanceConfig = {
        ...config!,
        params: Array.from((config!).params, (x: IParameter) => {
          return {
            ...x,
            value: x.name === edit.name ? value : x.value,
          };
        }),
    };
    props.editInstance(props.type, modifiedConfig);
    setConfig(modifiedConfig);
  };

  return (
    <Card className={classes.Card}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          padding: "1%",
        }}
      >
        <Fragment>
          <Select
            placeholder="Select a service"
            className={classes.Select}
            classNamePrefix="select"
            isSearchable={true}
            onChange={(choice: SingleValue<IServiceListItem>) => {
              setServiceChoice(choice!);
            }}
            name="color"
            options={props.servicesList}
            menuPortalTarget={document.querySelector("body")}
          />
          <Select
            placeholder="Select an Action"
            className={classes.Select}
            classNamePrefix="select"
            isSearchable={true}
            onChange={(choice: SingleValue<IEventListItem>) => {
              setEventChoice(
                choice!,
                setConfig,
                setChosenEvent,
                chosenService!,
                props
              );
            }}
            name="color"
            options={events}
            menuPortalTarget={document.querySelector("body")}
          />
          {chosenEvent !== undefined ? (
            <ListParams event={chosenEvent} editParams={editActionParams} />
          ) : null}
        </Fragment>
      </Box>
    </Card>
  );
}

export default ServiceChoice;
