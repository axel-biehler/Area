const fetch = require('node-fetch');
const User = require('../../../../database/User');

const createCard = async (instance) => {
  const u = await User.findById(instance.userId);

  if (u == null) {
    throw Error('user not found');
  }
  const params = instance.reaction.params.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }),
    {});
  const paramsSend = new URLSearchParams();

  paramsSend.append('title', params.title);
  paramsSend.append('desc', params.description);
  paramsSend.append('idList', params.listName);

  fetch('https://api.trello.com/1/cards',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `OAuth oauth_consumer_key="${process.env.TRELLO_API_KEY}", oauth_token="${u.trello.trelloToken}"`,
      },
      body: { params },
    })
    .then((text) => {
      if (text.statusCode !== 200) {
        throw Error('card not created');
      }
    })
    .catch((err) => {
      console.error(err);
      throw Error('card not created');
    });
};

module.exports = createCard;
