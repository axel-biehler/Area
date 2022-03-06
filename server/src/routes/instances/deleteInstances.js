/* eslint-disable max-len */
const Instance = require('../../database/Instance');
const deleteGithubAction = require('../services/github/actions/delete');

const deleteAction = {
  github: deleteGithubAction,
};

const deleteInstances = async (req, res) => {
  const { service } = req.params;

  try {
    const all = await Instance.find({ userId: req.userId });

    const instances = all.filter(({ action, reaction }) => action.serviceName === service || reaction.serviceName === service);

    await instances.forEach(async (instance) => {
      if (instance.action.serviceName === service) {
        await deleteAction[instance.action.serviceName](req.userId, instance.action);
      }

      await instance.remove();
    });

    res.json({
      status: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: 'internal error',
    });
  }
};

module.exports = deleteInstances;
