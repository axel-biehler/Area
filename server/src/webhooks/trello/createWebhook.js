const fetch = require('node-fetch');
const { User } = require('../../database');

const create = async (userId, idModel, description) => {
  const apiKey = process.env.TRELLO_API_KEY;
  const u = await User.findById(userId);
  const callbackURL = 'https://events.hookdeck.com/e/src_1SNJ5LnZckK6Yyd8cXN0qAss';

  if (u == null) {
    throw Error('user not found');
  }

  fetch(`https://api.trello.com/1/webhooks?callbackURL=${callbackURL}&idModel=${idModel}&description=${description}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `OAuth oauth_consumer_key="${apiKey}", oauth_token="${u.trelloToken}"`,
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        console.error(response.statusText);
        throw Error(`${response.status} ${response.statusText}`);
      }
      console.log(response.body);
    })
    .then((text) => console.log(text))
    .catch((err) => {
      console.error(err);
      throw Error(err);
    });
};

module.exports = create;
