const createIssue = require('./createIssue');
const createRepository = require('./createRepository');

const runReaction = {
  createIssue,
  createRepository,
};

const githubRunReaction = async (instance) => {
  await runReaction[instance.reaction.name](instance);
};

module.exports = githubRunReaction;
