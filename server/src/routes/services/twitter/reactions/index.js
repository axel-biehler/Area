const postTweet = require('./postTweet');

const runReaction = {
  postTweet,
};

const trelloRunReaction = async (instance) => {
  await runReaction[instance.reaction.name](instance);
};

module.exports = trelloRunReaction;
