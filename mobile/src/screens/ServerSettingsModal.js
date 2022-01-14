import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput } from 'react-native-paper';

const SERVER_URL_KEY = '@server_url';
const SERVER_URL_DEFAULT = 'http://10.0.2.2:8080';

const ServerSettingsModal = () => {
  const [hasChanges, setHasChanges] = useState(false);
  const [serverUrl, setServerUrl] = useState();

  const updateSettings = async () => {
    await AsyncStorage.setItem(SERVER_URL_KEY, serverUrl);
    setHasChanges(false);
  };

  useEffect(() => {
    (async () => {
      const val = await AsyncStorage.getItem(SERVER_URL_KEY);
      setServerUrl(val || SERVER_URL_DEFAULT);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        label="Server address"
        value={serverUrl}
        onChangeText={val => {
          setServerUrl(val);
          setHasChanges(true);
        }}
      />
      <Button disabled={!hasChanges} onPress={updateSettings}>
        Confirm changes
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginVertical: 16,
  },
});

export default ServerSettingsModal;
