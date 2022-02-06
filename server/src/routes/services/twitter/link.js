const OAuth = require('oauth');
const { promisify } = require('util');
const { User } = require('../../../database');

const link = async (req, res) => {
  const { oauthToken, oauthVerifier } = req.body;

  const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    '1.0A', null, 'HMAC-SHA1',
  );

  const postToken = promisify(oauth.post.bind(oauth));

  try {
    const body = await postToken(
      `https://api.twitter.com/oauth/access_token?oauth_verifier=${oauthVerifier}&oauth_token=${oauthToken}`,
      null,
      null,
      null,
    ).catch((err) => console.error(err));

    const params = new URLSearchParams(body);

    const accessToken = params.get('oauth_token');
    const oauthTokenSecret = params.get('oauth_token_secret');
    const userId = params.get('user_id');

    const u = await User.findOne({ id: req.userId });

    if (u == null) {
      res.json({
        status: false,
        error: 'User not found.',
      });
      return;
    }

    u.twitterId = userId;
    u.twitterAccess = accessToken;
    u.twitterRefresh = oauthTokenSecret;

    await u.save();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: 'internal error',
    });
    return;
  }
  res.json({
    status: true,
  });
};

module.exports = link;
