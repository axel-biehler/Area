const { Schema, model } = require('mongoose');

const TABLE_NAME = 'User';

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  emailToken: String,
  twitterAccess: String,
  twitterRefresh: String,
  twitterId: String,
  githubToken: String,
});

const User = model(TABLE_NAME, UserSchema);

module.exports = User;
