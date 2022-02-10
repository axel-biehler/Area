import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { IFormProps } from "./ModalAuth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#f9f9f9",
      fontFamily: "Roboto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(2),
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "300px",
      },
      "& .MuiButtonBase-root": {
        margin: theme.spacing(2),
      },
    },
  })
);

function RegisterForm(props: IFormProps) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    props.setError("");

    const data = {
      email: email,
      username: username,
      password: password,
    };
    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async function (response: any) {
        const resBody = await response.json();
        if (!resBody.status) {
          props.setError(resBody.error);
          props.handleClose();
        } else {
          navigate("/login");
          props.handleClose();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Username"
        variant="filled"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        variant="filled"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <Button variant="contained" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
