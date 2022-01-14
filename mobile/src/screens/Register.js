import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import {
  Button,
  IconButton,
  Colors,
  TextInput,
  Text,
  ActivityIndicator,
} from 'react-native-paper';
import request from '../api/request';

const Register = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    setIsLoading(true);

    try {
      const result = await request('/auth/register', 'POST', {
        email,
        username,
        password,
      });

      if (!result.status) {
        setError(`An error occured: ${result.error}.`);
        setIsLoading(false);
      } else {
        navigateToLogin();
      }
    } catch (err) {
      console.error(err);
      setError('An error occured. Please try again.');
      setIsLoading(false);
    }
  };

  const openServerSettings = () => navigation.navigate('Server settings');
  const navigateToLogin = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
            params: {
              registerSuccess: true,
            },
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
      <TextInput
        style={styles.input}
        label="Email address"
        left={<TextInput.Icon name="email" color={Colors.grey700} />}
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />
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
          icon="send"
          mode="contained"
          onPress={register}>
          Sign me up
        </Button>
      </View>
      <Button onPress={navigateToLogin}>Already have an account?</Button>
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
});

export default Register;
