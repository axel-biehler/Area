const Instance = require('../../database/Instance');
const { verifyAction, verifyReaction } = require('../../../utils/verifyInstance');

const updateInstance = async (req, res) => {
  const { id } = req.params;

  try {
    const instance = await Instance.findById(id);
    const { action, reaction } = req.body;

    if (instance === null) {
      res.status(400).json({
        status: false,
        error: 'instance not found',
      });
      return;
    }
    if (instance.userId !== req.userId) {
      res.status(400).json({
        status: false,
        error: 'not your instance',
      });
    }

    if (action != null) {
      instance.action.params = action;
      verifyAction(instance.action);
    }

    if (reaction != null) {
      instance.reaction.params = reaction;
      verifyReaction(instance.reaction);
    }

    await instance.save();

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

module.exports = updateInstance;
