import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Button,
} from "@material-ui/core";
import Navbar from "../components/Navbar";
import myFetch from "../api/api";
import {
  IAction,
  IServiceListItem,
  IInstance,
  IInstanceConfig,
  IStatusResponse,
} from "../Interfaces";
import ServiceChoice from "../components/Instances/ServiceChoice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Container: {
      height: "100%",
      width: "100%",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

function HomePage() {
  const classes = useStyles();
  const [actionServices, setActionServices] = useState<IServiceListItem[]>([]);
  const [reactionServices, setReactionServices] = useState<IServiceListItem[]>([]);
  const [newInstance, setNewInstance] = useState<IInstance>({action: undefined, reaction: undefined});

  const initialize = async () => {
    const actions: IAction[] = await myFetch<IAction[]>("/actions", "GET");
    const actionList = Array.from(actions, (x: IAction) => {
      return {
        value: x.name,
        label: x.displayName,
        description: x.description,
        widgets: x.widgets,
        isDisabled: false,
      };
    });
    setActionServices(actionList);

    const reactions: IAction[] = await myFetch<IAction[]>("/reactions", "GET");
    const reactionList = Array.from(reactions, (x: IAction) => {
      return {
        value: x.name,
        label: x.displayName,
        description: x.description,
        widgets: x.widgets,
        isDisabled: false,
      };
    });
    setReactionServices(reactionList);
  };

  useEffect(() => {
    initialize();
  }, []);

  const editInstance = (type: string, config: IInstanceConfig) => {
    if (type === "action") {
      const modifiedInstance: IInstance = {
        action: config,
        reaction: {
          ...newInstance!.reaction!,
        },
      };
      setNewInstance(modifiedInstance);
    } else if (type === "reaction") {
      const modifiedInstance: IInstance = {
        action: {
          ...newInstance!.action!,
        },
        reaction: config,
      };
      setNewInstance(modifiedInstance);
    }
  };

  const createInstance = async () => {
    console.log(JSON.stringify(newInstance));
    const res: IStatusResponse = await myFetch<IStatusResponse>(
      "/instances",
      "POST",
      JSON.stringify(newInstance)
    );
    if (!res.status) {
      console.log(res.error);
    } else {
      setNewInstance({action: undefined, reaction: undefined});
    }
  };

  return (
    <CssBaseline>
      <Navbar />
      <div className="App">
        <Typography variant="h2">
          Trigger reactions to various actions.
        </Typography>
        <div className={classes.Container}>
          <ServiceChoice
            editInstance={editInstance}
            type={"action"}
            servicesList={actionServices}
          />
          <ServiceChoice
            editInstance={editInstance}
            type={"reaction"}
            servicesList={reactionServices}
          />
          <Button
            variant="contained"
            color="primary"
            size={"medium"}
            onClick={() => {
              createInstance();
            }}
          >
            Create instance
          </Button>
        </div>
      </div>
    </CssBaseline>
  );
}

export default HomePage;
