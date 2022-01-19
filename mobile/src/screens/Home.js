import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { token as tokenStorage } from '../utils/storage';

const Home = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    (async () => {
      setToken(await tokenStorage.get());
    })();
  });
  return <Text>{token}</Text>;
};

export default Home;
