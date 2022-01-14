import React from 'react';
import { Appbar } from 'react-native-paper';

const CustomNavigationBar = ({ navigation, back, route }) => {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={route.name.toUpperCase()} />
    </Appbar.Header>
  );
};

export default CustomNavigationBar;
