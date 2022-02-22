const createIssue = require('./createIssue');

const runReaction = {
  github: createIssue,
};

const githubRunReaction = async (instance) => {
  await runReaction[instance.reaction.serviceName](instance);
};

module.exports = githubRunReaction;
