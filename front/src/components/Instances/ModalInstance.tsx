import React from "react";
import Dialog from "@material-ui/core/Dialog";
import ServiceChoice from "./ServiceChoice";
import {
  Button,
  createStyles,
  DialogContent,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { IModalInstanceProps } from "../../Interfaces";

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
    ModalButtons: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-evenly",
    },
  })
);

function ModalInstance(props: IModalInstanceProps) {
  const classes = useStyles();

  return (
    <Dialog
      id={"dialogBody"}
      style={{ overflow: "visible" }}
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogContent style={{ overflow: "visible" }}>
        <div className={classes.Container}>
          <Typography variant="h6">Action</Typography>
          <ServiceChoice
            editInstance={props.editInstance}
            type={"action"}
            servicesList={props.actionServices}
          />

          <Typography variant="h6">Reaction</Typography>
          <ServiceChoice
            editInstance={props.editInstance}
            type={"reaction"}
            servicesList={props.reactionServices}
          />

          <div className={classes.ModalButtons}>
            <Button variant="text" onClick={props.handleClose}>
              Cancel
            </Button>
            <Button
              variant="text"
              color="primary"
              size={"medium"}
              onClick={() => {
                props.createInstance();
              }}
            >
              Create instance
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ModalInstance;
