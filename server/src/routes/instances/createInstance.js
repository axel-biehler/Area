/* eslint-disable max-len */
const Instance = require('../../database/Instance');
const { verifyAction, verifyReaction } = require('../../../utils/verifyInstance');
const createGithubAction = require('../services/github/actions/create');

const createAction = {
  github: createGithubAction,
};

const createInstance = async (req, res) => {
  const { action, reaction } = req.body;
  const { userId } = req;

  try {
    const instance = new Instance({
      userId,
      action,
      reaction,
    });

    verifyAction(instance.action);
    verifyReaction(instance.reaction);

    // essayer avec un nom indisponible
    instance.action.webhookId = await createAction[instance.action.serviceName](userId, instance.action);

    await instance.save();
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: false,
      error: 'internal error',
    });
    return;
  }

  res.json({
    status: true,
  });
};

module.exports = createInstance;
