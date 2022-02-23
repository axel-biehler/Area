import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { token as tokenStorage } from '../utils/storage';

const Home = () => {
  const [token, setToken] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      setToken(await tokenStorage.get());
    })();
  });
  return (
    <>
      <Text>{token}</Text>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('Create instance')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;
