const Instance = require('../../database/Instance');
const githubRunReaction = require('../services/github/reactions');

const runReaction = {
  github: githubRunReaction,
};

const runInstance = async (webhookId) => {
  const instances = await Instance.find({ 'action.webhookId': webhookId });

  if (!instances.length) {
    throw Error('instance not found');
  }

  console.log('\n\ninstances begin\n\n', instances, '\n\ninstances end\n\n');

  await instances.forEach(async (instance) => {
    // verification of the integrety of the webhook id

    if (instance.action.webhookId.toString() !== webhookId) {
      throw Error('not your instance');
    }

    // Distribute the reactions in the differents services

    await runReaction[instance.reaction.serviceName](instance);
  });
};

module.exports = runInstance;
