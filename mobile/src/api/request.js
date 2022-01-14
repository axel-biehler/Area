import AsyncStorage from '@react-native-async-storage/async-storage';

// const AUTHORIZATION_PREFIX = 'Bearer ';
const SERVER_URL_KEY = '@server_url';
const SERVER_URL_DEFAULT = 'http://10.0.2.2:8080';

const getApiUrl = async () => {
  const val = await AsyncStorage.getItem(SERVER_URL_KEY);
  return val || SERVER_URL_DEFAULT;
};

const request = async (route, method = 'GET', body = undefined) => {
  // const token = getToken();
  const res = await fetch(`${await getApiUrl()}${route}`, {
    method,
    headers: {
      'Content-Type': body !== undefined ? 'application/json' : undefined,
      // Authorization: token != null ? `${AuthorizationPrefix}${token}` : undefined,
    },
    body: JSON.stringify(body),
  });

  const resBody = await res.json();
  return resBody;
};

export default request;
