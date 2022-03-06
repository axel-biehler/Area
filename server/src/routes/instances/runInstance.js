const githubRunReaction = require('../services/github/reactions');
const discordRunReaction = require('../services/discord/reactions');
const todoistRunReaction = require('../services/todoist/reaction');
const redditRunReaction = require('../services/reddit/reaction');

const runReaction = {
  github: githubRunReaction,
  discord: discordRunReaction,
  todoist: todoistRunReaction,
  reddit: redditRunReaction,
};

const runInstance = async (instances) => {
  // Distribute the reactions in the differents services

  await instances.forEach(async (instance) => {
    try {
      await runReaction[instance.reaction.serviceName](instance);
    } catch (err) {
      console.error(`An error append while executing this reaction: ${instance.reaction.name}`);
    }
  });
};

module.exports = runInstance;
