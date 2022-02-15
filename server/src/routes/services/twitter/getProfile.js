const OAuth = require('oauth');
const { promisify } = require('util');
const { User } = require('../../../database');

const getProfileTest = async (req, res) => {
  const u = await User.findOne(req.userId);

  const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    '1.0A', null, 'HMAC-SHA1',
  );

  const getProfile = promisify(oauth.get.bind(oauth));

  try {
    let body = await getProfile('https://api.twitter.com/2/users/me',
      u.twitterAccess,
      u.twitterRefresh).catch((err) => console.error(err));
    body = JSON.parse(body);
    res.json({
      status: true,
      body,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: 'internal error',
    });
  }
};

module.exports = getProfileTest;
