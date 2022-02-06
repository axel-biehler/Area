const axios = require("axios")
const { User } = require('../../../database');

const userExample = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.userId});

    if (user == null) {
      return res.json({
        status: false,
        error: 'User not found.'
      });
    }

    if (!user.githubToken) {
      return res.json({
        status: false,
        error: 'User not register to github account.'
      });
    }

    const { data } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${user.githubToken}`
      }
    });

    res.send({
      status: true,
      data
    })

  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: false,
      error: 'internal userExample error',
    });
  }
};

module.exports = userExample;
