const createCard = require('./createCard');

const runReaction = {
  createCard,
};

const trelloRunReaction = async (instance) => {
  await runReaction[instance.reaction.name](instance);
};

module.exports = trelloRunReaction;
