const fetch = require('node-fetch');
const User = require('../../../database/User');

const createCard = async (reaction, userId) => {
  const u = await User.findById(userId);

  if (u == null) {
    throw Error('user not found');
  }

  const params = new URLSearchParams();

  params.append('name', reaction.params.find((x) => x.name === 'title').value);
  params.append('desc', reaction.params.find((x) => x.name === 'description').value);

  fetch('https://api.trello.com/1/cards',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `OAuth oauth_consumer_key="${process.env.TRELLO_API_KEY}", oauth_token="${u.trelloToken}"`,
      },
      body: { params },
    })
    .then((text) => console.log(text))
    .catch((err) => {
      console.error(err);
      throw Error('card not created');
    });
};

module.exports = createCard;
