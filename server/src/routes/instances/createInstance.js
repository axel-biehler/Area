const Instance = require('../../database/Instance');
const { verifyAction, verifyReaction } = require('../../../utils/verifyInstance');

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

    await instance.save();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statsu: false,
      error: 'internal error',
    });
    return;
  }

  res.json({
    status: true,
  });
};

module.exports = createInstance;
