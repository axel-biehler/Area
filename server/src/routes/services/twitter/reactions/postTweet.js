const fetch = require('node-fetch');
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
const { User } = require('../../../../database');

const consumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;

const endpointURL = 'https://api.twitter.com/2/tweets';

const postTweet = async (instance) => {
  const u = User.findById(instance.userId);

  const oauth = OAuth({
    consumer: {
      key: consumerKey,
      secret: consumerSecret,
    },
    signature_method: 'HMAC-SHA1',
    hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64'),
  });

  const token = {
    key: u.twitterAccess,
    secret: u.twitterRefresh,
  };

  const authHeader = oauth.toHeader(oauth.authorize({
    url: endpointURL,
    method: 'POST',
  }, token));

  const params = instance.reaction.params.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }),
    {});

  const req = await fetch(endpointURL, {
    method: 'POST',
    body: params.text,
    headers: {
      Authorization: authHeader.Authorization,
      'user-agent': u.twitterId,
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });
  const test = await req.json();
  console.log(test);
};

module.exports = postTweet;
