const OAuth = require('oauth');
const { promisify } = require('util');

const connect = async (req, res) => {
  const { callback } = req.body;
  const encodedCallback = encodeURIComponent(callback);

  const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    '1.0A', null, 'HMAC-SHA1',
  );
  const postRequestToken = promisify(oauth.post.bind(oauth));

  const body = await postRequestToken(
    `https://api.twitter.com/oauth/request_token?oauth_callback=${encodedCallback}`,
    null,
    null,
    null,
    null,
  );

  const params = new URLSearchParams(body);

  const oauthToken = params.get('oauth_token');
  const oauthTokenSecret = params.get('oauth_token_secret');

  if (!oauthToken && !oauthTokenSecret) {
    res.status(500).json({
      status: false,
      error: 'internal error',
    });
    return;
  }

  res.json({
    status: true,
    oauthToken,
  });
};

module.exports = connect;
