import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Text,
  Button,
  TextInput,
  Headline,
  ActivityIndicator,
} from 'react-native-paper';
import { username as usernameStorage } from '../utils/storage';
import request from '../api/request';

const Profile = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [id, setId] = useState('');
  const [originalUsername, setOriginalUsername] = useState('');
  const [username, setUsername] = useState({ changes: false, val: '' });
  const [email, setEmail] = useState({ changes: false, val: '' });
  const [password, setPassword] = useState({ changes: false, val: '' });

  const anyChanges = username.changes || email.changes || password.changes;

  const updateProfile = async () => {
    await request('/profile/patch', 'PATCH', {
      _id: id,
      email: email.val,
      username: username.val,
    });

    if (password.changes) {
      await request('/profile/password', 'PATCH', {
        username: originalUsername,
        password: password.val,
      });
    }

    setEmail({ changes: false, val: email.val });
    setUsername({ changes: false, val: username.val });
    setPassword({ changes: false, val: password.val });
  };

  useEffect(() => {
    (async () => {
      setIsFetching(true);

      const u = await usernameStorage.get();
      const profile = await request(`/profile/get?username=${u}`);

      setId(profile.user._id);
      setUsername({ changes: false, val: profile.user.username });
      setOriginalUsername(profile.user.username);
      setEmail({ changes: false, val: profile.user.email });

      setIsFetching(false);
    })();
  }, []);

  if (isFetching) {
    return (
      <ActivityIndicator
        style={styles.container}
        animating={true}
        size={'large'}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Headline>Hi {username.val}!</Headline>
      <Text>Edit your profile</Text>
      <TextInput
        style={styles.textInput}
        label="Email address"
        value={email.val}
        keyboardType="email-address"
        onChangeText={val => {
          setEmail({
            changes: true,
            val,
          });
        }}
      />
      <TextInput
        style={styles.textInput}
        label="Username"
        value={username.val}
        onChangeText={val => {
          setUsername({
            changes: true,
            val,
          });
        }}
      />
      <TextInput
        style={styles.textInput}
        label="Password"
        value={password.val}
        secureTextEntry
        onChangeText={val => {
          setPassword({
            changes: true,
            val,
          });
        }}
      />
      <Button disabled={!anyChanges} onPress={updateProfile}>
        Confirm changes
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  textInput: {
    marginVertical: 2,
  },
});

export default Profile;
