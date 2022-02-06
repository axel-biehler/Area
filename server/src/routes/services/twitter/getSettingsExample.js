const OAuth = require('oauth');
const { promisify } = require('util');
const { User } = require('../../../database');

const getSettingsTest = async (req, res) => {
  const u = await User.findOne(req.userId);
  let body = null;

  const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    '1.0A', null, 'HMAC-SHA1',
  );

  const getSettings = promisify(oauth.get.bind(oauth));

  try {
    body = await getSettings('https://api.twitter.com/1.1/account/settings.json',
      u.twitterAccess,
      u.twitterRefresh).catch((err) => console.error(err));
    body = JSON.parse(body);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: 'internal error',
    });
    return;
  }
  res.json({
    body,
  });
};

module.exports = getSettingsTest;
