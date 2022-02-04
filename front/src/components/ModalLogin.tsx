import React from "react";
import Dialog from "@material-ui/core/Dialog";
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

class ModalLogin extends React.Component<{
  open: boolean;
  handleClose: any;
  isLogin: boolean;
}> {
  render() {
    let { open, handleClose, isLogin } = this.props
    return (
      <Dialog open={open} onClose={handleClose}>
        {/*@ts-ignore*/}
        { isLogin ? <LoginForm handleClose={handleClose} /> : <RegisterForm handleClose={handleClose} /> }
      </Dialog>
    );
  }
}

export default ModalLogin;
