const fetch = require('node-fetch');
const { User } = require('../../database');

const create = async (userId, idModel) => {
  const apiKey = process.env.TRELLO_API_KEY;
  const u = await User.findById(userId);

  if (u == null) {
    throw Error('user not found');
  }

  const res = fetch(`https://api.trello.com/1/tokens/${u.trelloToken}/webhooks/?key=${apiKey}`);
};

module.exports = create;
