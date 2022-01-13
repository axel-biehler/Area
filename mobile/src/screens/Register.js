import React from 'react';
import { Button } from 'react-native-paper';

const Register = () => {
  const onClick = () => console.log('Register now!');
  return (
    <Button icon="send" mode="contained" onPress={onClick}>
      Sign me up
    </Button>
  );
};

export default Register;
