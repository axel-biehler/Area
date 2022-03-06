const createPost = require('./createPost');
const createPostSub = require('./createPostSub');

const runReaction = {
  createPost,
  createPostSub,
};

const todoistRunReaction = async (instance) => {
  await runReaction[instance.reaction.name](instance);
};

module.exports = todoistRunReaction;
