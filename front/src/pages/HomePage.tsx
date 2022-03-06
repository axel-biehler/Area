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
  IInstance,
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

  const emitError = (error: string) => {
    setError(error);
    setTimeout( () => {
      setError("");
    }, 5000);
  }

  const refreshInstances = async () => {
    const instancesList: IInstanceRequest = await myFetch<IInstanceRequest>(
      "/instances",
      "GET"
    );
    if (instancesList.status) {
      setInstances(instancesList.instances);
    }
  };

  const initialize = async () => {
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

  const saveInstance = async (id: string, instance: IInstance) => {
    const res: IStatusResponse = await myFetch<IStatusResponse>(`/instances/${instance._id}`, "POST", JSON.stringify({action: instance.action, reaction: instance.reaction}));
    if (!res.status) {
      console.log(res.error);
    } else {
      emitError(res.error!);
    }
    refreshInstances();
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
          refreshInstances={refreshInstances}
          emitError={emitError}
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
                <InstanceEditor
                  instance={element}
                  saveInstance={saveInstance}
                  deleteInstance={deleteInstance}
                  key={index}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </CssBaseline>
  );
}

export default HomePage;
