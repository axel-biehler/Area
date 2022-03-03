import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  Box,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import {
  IEventListItem,
  IInstance,
  IInstanceEditorProps,
  IParameter,
} from "../../Interfaces";
import { DeleteOutlineTwoTone, Settings } from "@material-ui/icons";
import ListParams from "./ListParams";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Card: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "white",
      width: "100%",
      height: "100%",
      padding: "15px 5px",
    },
    Collapsible: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      height: "0",
      transition: "all 0.5s ease",
      borderRadius: "0.25rem",
      overflow: "hidden",
    },
    CollapsibleActive: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      height: "150px",
      transition: "all 0.5s ease",
    },
  })
);

function getParamType(instance: IInstance, edit: IParameter) {
  for (var _i = 0; _i < instance.action?.params.length!; _i++) {
    if (instance.action?.params[_i].name === edit.name) return "action";
  }
  return "reaction";
}

function InstanceEditor(props: IInstanceEditorProps) {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [actionParams, setActionParameters] = useState<
    IEventListItem | undefined
  >(undefined);
  const [reactionParams, setReactionParameters] = useState<
    IEventListItem | undefined
  >(undefined);

  const initialize = async (myProps: IInstanceEditorProps) => {
    const tmpAct: IEventListItem = {
      value: myProps.instance.action?.name!,
      label: myProps.instance.action?.displayName!,
      description: myProps.instance.action?.displayName!,
      parameters: myProps.instance.action?.params!,
    };
    setActionParameters(tmpAct);
    const tmpReact: IEventListItem = {
      value: myProps.instance.reaction?.name!,
      label: myProps.instance.reaction?.displayName!,
      description: myProps.instance.reaction?.displayName!,
      parameters: myProps.instance.reaction?.params!,
    };
    setReactionParameters(tmpReact);
  };

  useEffect(() => {
    initialize(props);
  }, [props]);

  const toggleSettings = () => {
    setOpen(!open);
  };

  const editParams = (edit: IParameter, value: any) => {
    if (getParamType(props.instance, edit) === "reaction") {
      const modifiedInstance: IInstance = {
        ...props.instance,
        action: props.instance.action,
        reaction: {
          ...props.instance.reaction!,
          params: Array.from(
            props.instance.reaction?.params!,
            (x: IParameter) => {
              return {
                ...x,
                value: x.name === edit.name ? value : x.value,
              };
            }
          ),
        },
      };
      props.editInstance(modifiedInstance);
    } else {
      const modifiedInstance: IInstance = {
        ...props.instance,
        action: {
          ...props.instance.action!,
          params: Array.from(
            props.instance.action?.params!,
            (x: IParameter) => {
              return {
                ...x,
                value: x.name === edit.name ? value : x.value,
              };
            }
          ),
        },
        reaction: props.instance.reaction,
      };
      props.editInstance(modifiedInstance);
    }
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
        <Typography variant="h6" gutterBottom={true}>
          When {props.instance.action?.displayName} on{" "}
          {props.instance.action?.serviceName}
          <br />
          {props.instance.reaction?.displayName}
        </Typography>

        <div className={open ? classes.CollapsibleActive : classes.Collapsible}>
          {actionParams ? (
            <ListParams event={actionParams} editParams={editParams} />
          ) : null}
          {reactionParams ? (
            <ListParams event={reactionParams} editParams={editParams} />
          ) : null}
        </div>

        {open ? (
          <div >
            <Button
              variant="contained"
              color="primary"
              size={"medium"}
              onClick={() => {
                props.saveInstance(props.instance._id!);
              }}
            >
              Save
            </Button>
          </div>
        ) : null}

        <div>
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={toggleSettings}
            >
              <Settings color="primary" />
            </IconButton>
          </label>
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => {
                props.deleteInstance(props.instance);
              }}
            >
              <DeleteOutlineTwoTone color="primary" />
            </IconButton>
          </label>
        </div>
      </Box>
    </Card>
  );
}

export default InstanceEditor;
