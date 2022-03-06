const Instance = require('../../database/Instance');

const getInstanceByUser = async (req, res) => {
  try {
    const instances = await Instance.findById(req.userId);

    res.json({
      status: true,
      instances,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: 'internal error',
    });
  }
};

module.exports = getInstanceByUser;
