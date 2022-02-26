const githubRunReaction = require('../services/github/reactions');

const runReaction = {
  github: githubRunReaction,
};

const runInstance = async (instances) => {
  // Distribute the reactions in the differents services

  await instances.forEach(async (instance) => {
    await runReaction[instance.reaction.serviceName](instance);
  });
};

module.exports = runInstance;
