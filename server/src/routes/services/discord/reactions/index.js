const createChannel = require('./createChannel');

const runReaction = {
  createChannel,
};

const discordRunReaction = async (instance) => {
  await runReaction[instance.reaction.name](instance);
};

module.exports = discordRunReaction;
