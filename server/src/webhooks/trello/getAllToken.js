const fetch = require('node-fetch');
const { User } = require('../../database');

const getAllToken = async (userId) => {
  const u = await User.findById(userId);
  const apiKey = process.env.TRELLO_API_KEY;

  if (u === null) {
    throw Error('user not found');
  }

  fetch(`https://api.trello.com/1/tokens/${u.trelloToken}/webhooks`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `OAuth oauth_consumer_key="${apiKey}", oauth_token="${u.trelloToken}"`,
    },
  })
    .then((response) => {
      console.log(`response: ${response.status} ${response.statusText}`);
      return response.text();
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
      throw Error(err);
    });
};

module.exports = getAllToken;
