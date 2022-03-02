const fetch = require('node-fetch');
const { User } = require('../../../database');

const getAllToken = async (userId) => {
  const u = await User.findById(userId);
  const apiKey = process.env.TRELLO_API_KEY;

  if (u === null) {
    throw Error('user not found');
  }

  const val = await fetch(`https://api.trello.com/1/tokens/${u.trello.trelloToken}/webhooks`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `OAuth oauth_consumer_key="${apiKey}", oauth_token="${u.trello.trelloToken}"`,
    },
  })
    .then((response) => response.text())
    .then((response) => JSON.parse(response))
    .catch((err) => {
      console.error(err);
      throw Error(err);
    });

  return val;
};

const deleteWebhook = async (userId, id) => {
  const u = await User.findById(userId);
  const apiKey = process.env.TRELLO_API_KEY;

  if (u == null) {
    throw Error('user not found');
  }

  fetch(`https://api.trello.com/1/webhooks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `OAuth oauth_consumer_key="${apiKey}", oauth_token="${u.trello.trelloToken}"`,
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

const create = async (userId, action) => {
  const apiKey = process.env.TRELLO_API_KEY;
  const u = await User.findById(userId);
  const callbackURL = process.env.TRELLO_URL;
  const params = action.params.reduce((a, c) => ({ ...a, [c.name]: c.value }), {});
  let value = '';

  if (u == null) {
    throw Error('user not found');
  }

  await fetch(`https://api.trello.com/1/webhooks?callbackURL=${callbackURL}&idModel=${params.board}&description=${action.description}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `OAuth oauth_consumer_key="${apiKey}", oauth_token="${u.trello.trelloToken}"`,
    },
  })
    .then(async (response) => {
      if (response.status !== 200) {
        const res = await getAllToken(userId);

        const hook = res.find((x) => x.idModel === params.board);
        return { status: false, id: hook.id };
      }
      return response.text();
    })
    .then((body) => {
      if (body.status !== false) {
        const { id } = body;
        value = id;
      }
      value = body.id;
    })
    .catch((err) => {
      console.error(err);
      throw Error(err);
    });

  return value;
};

const webhook = async (req, res) => {
  console.log(req.body);

  res.json({
    status: true,
  });
};

module.exports = {
  webhook, create, deleteWebhook, getAllToken,
};
