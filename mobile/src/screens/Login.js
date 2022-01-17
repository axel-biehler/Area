import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  useNavigation,
  useRoute,
  CommonActions,
} from '@react-navigation/native';
import {
  Button,
  IconButton,
  Colors,
  TextInput,
  Text,
  ActivityIndicator,
} from 'react-native-paper';
import request from '../api/request';
import { token } from '../utils/storage';

const Login = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { registerSuccess } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    setIsLoading(true);

    try {
      const result = await request('/auth/login', 'POST', {
        username,
        password,
      });

      if (!result.status) {
        setError(`An error occured: ${result.error}.`);
        setIsLoading(false);
      } else {
        await token.set(result.token);
        navigateToHome();
      }
    } catch (err) {
      console.error(err);
      setError('An error occured. Please try again.');
      setIsLoading(false);
    }
  };

  const openServerSettings = () => navigation.navigate('Server settings');
  const navigateToRegister = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Register',
          },
        ],
      }),
    );
  };
  const navigateToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
          },
        ],
      }),
    );
  };

  return (
    <View>
      <View style={styles.settingsContainer}>
        <IconButton
          icon="cog"
          color={Colors.grey600}
          size={20}
          onPress={openServerSettings}
        />
      </View>
      {registerSuccess && (
        <Text style={styles.registerText}>
          You are now registered. Please validate your email address before
          logging in.
        </Text>
      )}
      <TextInput
        style={styles.input}
        label="Username"
        left={<TextInput.Icon name="account" color={Colors.grey700} />}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        label="Password"
        left={<TextInput.Icon name="lock" color={Colors.grey700} />}
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.buttonContainer}>
        {isLoading && <ActivityIndicator animating={true} size={'large'} />}
        <Button
          style={styles.button}
          disabled={isLoading}
          icon="send"
          mode="contained"
          onPress={register}>
          Log in
        </Button>
      </View>
      <Button onPress={navigateToRegister}>Need an account?</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  input: {
    marginHorizontal: 6,
    marginVertical: 6,
  },
  button: {
    marginVertical: 12,
    width: 200,
    padding: 2,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#e53935',
    marginHorizontal: 6,
    marginVertical: 2,
  },
  registerText: {
    marginHorizontal: 6,
    marginVertical: 2,
  },
});

export default Login;
