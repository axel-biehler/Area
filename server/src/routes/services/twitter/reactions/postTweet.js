const fetch = require('node-fetch');
const { User } = require('../../../../database');
const refresh = require('../refresh');

const postTweet = async (instance) => {
  const u = await User.findById(instance.userId);

  await refresh(instance.userId);

  if (u == null) {
    throw Error('user not found');
  }

  const params = instance.reaction.params.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }),
    {});

  const res = await fetch('https://api.twitter.com/2/tweets', {
    method: 'POSt',
    headers: {
      Authorization: `Bearer ${u.twitterAccess}`,
    },
    body: {
      text: params.text,
    },
  });

  const body = await res.json();

  console.log(body);
};

module.exports = postTweet;
