const fetch = require("node-fetch")
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

    const responseUser = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${dataOauth.access_token}`
      }
    })
    const dataUser = await responseUser.json();

    res.send({
      status: true,
      dataUser
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
