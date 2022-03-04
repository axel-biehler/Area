import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import Navbar from "../components/Navbar";
import myFetch from "../api/api";
import {
  IAction,
  IServiceListItem,
  IInstance,
  IInstanceConfig,
  IStatusResponse,
  IInstanceRequest,
} from "../Interfaces";
import ModalInstance from "../components/Instances/ModalInstance";
import InstanceEditor from "../components/Instances/InstanceEditor";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    FixedButton: {
      margin: 0,
      top: 100,
      bottom: "auto",
      left: 50,
      right: "auto",
      position: "fixed",
    },
    GridContainer: {
      width: "100%",
      padding: "0 50px",
    },
    Grid: {},
  })
);

function HomePage() {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [instances, setInstances] = useState<IInstance[] | undefined>(
    undefined
  );
  const [actionServices, setActionServices] = useState<IServiceListItem[]>([]);
  const [reactionServices, setReactionServices] = useState<IServiceListItem[]>(
    []
  );
  const [newInstance, setNewInstance] = useState<IInstance>({
    action: undefined,
    reaction: undefined,
  });

  const emitError = (error: string) => {
    setError(error);
    setTimeout( () => {
      setError("");
    }, 5000);
  }

  const getInstances = async () => {
    const instancesList: IInstanceRequest = await myFetch<IInstanceRequest>(
      "/instances",
      "GET"
    );
    if (instancesList.status) {
      setInstances(instancesList.instances);
    }
  };

  const initialize = async () => {
    const actions: IAction[] = await myFetch<IAction[]>("/actions", "GET");
    const actionList = Array.from(actions, (x: IAction) => {
      return {
        value: x.name,
        label: x.displayName,
        description: x.description,
        widgets: x.widgets,
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
    const instancesList: IInstanceRequest = await myFetch<IInstanceRequest>(
      "/instances",
      "GET"
    );
    if (instancesList.status) {
      setInstances(instancesList.instances);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const createInstance = async () => {
    const res: IStatusResponse = await myFetch<IStatusResponse>(
      "/instances",
      "POST",
      JSON.stringify(newInstance)
    );
    if (res.status) {
      getInstances();
    } else {
      emitError(res.error!);
    }
    setNewInstance({ action: undefined, reaction: undefined });
    handleClose();
  };

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

  const editExistingInstance = (config: IInstance) => {
    if (!instances) return;
    const newList: IInstance[] = Array.from(instances, (x: IInstance) => {
      if (x._id === config._id) {
        return config;
      }
      return x;
    });
    setInstances(newList);
  };

  const deleteInstance = async (toRemove: IInstance) => {
    const res: IStatusResponse = await myFetch<IStatusResponse>(
      `/instances/${toRemove._id}`,
      "DELETE"
    );
    if (res.status) {
      const newList = instances?.filter(
        (instance) => instance._id !== toRemove._id
      );
      setInstances(newList);
    } else {
      emitError(res.error!);
    }
  };

  const saveInstance = async (id: string) => {
    const toSave: IInstance | undefined = instances?.find(x => x._id === id);
    if (toSave === undefined) {
      return;
    }
    const res: IStatusResponse = await myFetch<IStatusResponse>(`/instances/${toSave._id}`, "POST", JSON.stringify({reaction: toSave.reaction}));
    if (!res.status) {
      console.log(res.error);
    } else {
      emitError(res.error!);
    }
    getInstances();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CssBaseline>
      <Navbar />
      <div className="App">
        <Typography variant="h2" gutterBottom={true}>
          Trigger reactions to various actions.
        </Typography>

        <ModalInstance
          open={open}
          handleClose={handleClose}
          createInstance={createInstance}
          editInstance={editInstance}
          actionServices={actionServices}
          reactionServices={reactionServices}
        />

        <Button
          variant="contained"
          color="primary"
          size={"medium"}
          className={classes.FixedButton}
          onClick={() => {
            setOpen(true);
          }}
        >
          Create an instance
        </Button>

        <Typography variant="h4" gutterBottom={true} color={"secondary"}>
          { error ? error : null}
        </Typography>

        <Grid
          container
          spacing={4}
          direction="row"
          alignItems="center"
          justifyContent="center"
          className={classes.Grid}
        >
          {instances?.map((element: IInstance, index: number) => {
            return (
              <Grid item xs={6} md={3} key={index}>
                {" "}
                <InstanceEditor
                  instance={element}
                  editInstance={editExistingInstance}
                  saveInstance={saveInstance}
                  deleteInstance={deleteInstance}
                  key={index}
                />{" "}
              </Grid>
            );
          })}
        </Grid>
      </div>
    </CssBaseline>
  );
}

export default HomePage;
