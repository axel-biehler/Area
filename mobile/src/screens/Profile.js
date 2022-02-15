import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import {
  Text,
  Button,
  TextInput,
  Headline,
  ActivityIndicator,
} from 'react-native-paper';
import request from '../api/request';

const Profile = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [originalUsername, setOriginalUsername] = useState();
  const [username, setUsername] = useState({ changes: false, val: '' });
  const [email, setEmail] = useState({ changes: false, val: '' });
  const [password, setPassword] = useState({ changes: false, val: '' });
  const [passwordConf, setPasswordConf] = useState('');

  const anyChanges = username.changes || email.changes || password.changes;

  const updateProfile = async () => {
    const res = await request('/profile', 'PATCH', {
      email: email.changes ? email.val : undefined,
      username: username.changes ? username.val : undefined,
      password: password.changes ? password.val : undefined,
    });

    if (res.status) {
      setEmail({ changes: false, val: email.val });
      setUsername({ changes: false, val: username.val });
      setPassword({ changes: false, val: '' });
      setPasswordConf('');
      setError(null);
    } else {
      setError(res.error);
    }
  };

  const linkTwitter = async () => {
    const res = await request('/services/twitter/connect', 'POST', {
      callback: 'http://localhost:8081/twitter/link',
    });

    Linking.openURL(
      `https://api.twitter.com/oauth/authorize?oauth_token=${res.oauthToken}`,
    );
  };

  const linkGithub = async () => {
    const res = await request('/services/github/env', 'GET');

    const { clientId } = res;
    const scope = 'repo';
    const state = 'github_random_string';

    Linking.openURL(
      `https://github.com/login/oauth/authorize?client_id=${clientId}&state=${state}&scope=${scope}`,
    );
  };

  const linkTrello = async () => {
    const res = await request('/services/trello/connect', 'POST', {
      callback: 'http://localhost:8081/trello/link',
    });

    Linking.openURL(res.redirectUrl);
  };

  useEffect(() => {
    const linkingBind = Linking.addEventListener('url', async data => {
      const url = new URL(data.url);
      console.log(url);

      if (url.pathname === '/twitter/link') {
        const oauthToken = url.searchParams.get('oauth_token');
        const oauthVerifier = url.searchParams.get('oauth_verifier');

        const res = await request('/services/twitter/link', 'POST', {
          oauthToken,
          oauthVerifier,
        });
        console.log(res);
      } else if (url.pathname === '/github/link') {
        const code = url.searchParams.get('code');
        const state = url.searchParams.get('state');

        const res = await request('/services/github/validate', 'POST', {
          code,
          state,
        });
        console.log(res);
      } else if (url.pathname === '/trello/link') {
        const oauthToken = url.searchParams.get('oauth_token');
        const oauthVerifier = url.searchParams.get('oauth_verifier');

        console.log(oauthToken, oauthVerifier);

        const res = await request('/services/trello/link', 'POST', {
          oauthToken,
          oauthVerifier,
        });
        console.log('ok', res);
      }
    });

    return () => {
      linkingBind.remove();
    };
  });

  useEffect(() => {
    (async () => {
      setIsFetching(true);

      const profile = await request('/profile');
      setOriginalUsername(profile.username);
      setUsername({ changes: false, val: profile.username });
      setEmail({ changes: false, val: profile.email });

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
      <Headline>Hi {originalUsername}!</Headline>
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
      <TextInput
        style={styles.textInput}
        secureTextEntry
        label="Confirm password"
        value={passwordConf}
        onChangeText={setPasswordConf}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button disabled={!anyChanges} onPress={updateProfile}>
        Confirm changes
      </Button>
      <View style={styles.container}>
        <Button mode="contained" onPress={linkTwitter}>
          Link Twitter account
        </Button>
        <Button mode="contained" onPress={linkGithub}>
          Link Github account
        </Button>
        <Button mode="contained" onPress={linkTrello}>
          Link Trello account
        </Button>
      </View>
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
  errorText: {
    marginHorizontal: 6,
    marginVertical: 2,
  },
});

export default Profile;
