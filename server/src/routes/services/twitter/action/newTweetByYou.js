const OAuth = require('oauth');
const { promisify } = require('util');
const { User } = require('../../../../database');

const newTweetByYou = async (instance) => {
  const u = await User.findById(instance.userId);

  if (u == null) {
    throw Error('User not found');
  }

  const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    '1.0A', null, 'HMAC-SHA1',
  );

  const getProfile = promisify(oauth.get.bind(oauth));

  const body = await getProfile(`https://api.twitter.com/2/users/${u.twitterId}/tweets`,
    u.twitterAccess, u.twitterRefresh);

  return JSON.parse(body).data;
};

module.exports = newTweetByYou;
