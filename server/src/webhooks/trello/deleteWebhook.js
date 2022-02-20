const fetch = require('node-fetch');
const { User } = require('../../database');

const deleteWebhook = async (userId, id) => {
  const u = await User.findById(userId);
  const apiKey = process.env.TRELLO_API_KEY;

  if (u == null) {
    throw Error('user not found');
  }

  fetch(`https://api.trello.com/1/webhooks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `OAuth oauth_consumer_key="${apiKey}", oauth_token="${u.trelloToken}"`,
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        console.error(response.statusText);
        throw Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch((err) => console.error(err));
};

module.exports = deleteWebhook;
