const Instance = require('../../database/Instance');
const getAllToken = require('../../webhooks/trello/getAllToken');

const getInstanceByUser = async (req, res) => {
  try {
    const instances = await Instance.findById(req.userId);

    res.json({
      status: true,
      instances,
    });

    console.log(await getAllToken(req.userId));
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: 'internal error',
    });
  }
};

module.exports = getInstanceByUser;
