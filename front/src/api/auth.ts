const jsonwebtoken = require('jsonwebtoken');

const LOCAL_TOKEN_KEY = 'jwt';
const LOCAL_USERNAME_KEY = 'username';

const setToken = (token: string) => {
  const decoded = jsonwebtoken.decode(token);
  localStorage.setItem(LOCAL_TOKEN_KEY, token);
  localStorage.setItem(LOCAL_USERNAME_KEY, decoded.username);
};

const clearToken = () => {
  localStorage.removeItem(LOCAL_TOKEN_KEY);
  localStorage.removeItem(LOCAL_USERNAME_KEY);
};

const getToken = () => localStorage.getItem(LOCAL_TOKEN_KEY);

const getUsername = () => localStorage.getItem(LOCAL_USERNAME_KEY);

export {
  setToken,
  clearToken,
  getToken,
  getUsername,
};
