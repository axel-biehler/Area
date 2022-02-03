import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Form from './LoginForm';

class ModalLogin extends React.Component<{
  open: boolean;
  handleClose: any;
}> {
  render() {
    let { open, handleClose } = this.props;
    return (
      <Dialog open={open} onClose={handleClose}>
        {/* @ts-ignore*/}
        <Form handleClose={handleClose} />
      </Dialog>
    );
  }
}

export default ModalLogin;
