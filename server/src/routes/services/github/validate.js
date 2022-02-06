const axios = require("axios")
const { User } = require('../../../database');

const validate = async (req, res) => {
  try {
  let { code, state } = req.body;

    if (!code || !state || state != process.env.GITHUB_STATE) {
      res.json({
        status: false,
        error: 'no code or state recieved from github service',
      });
      return;
    }

    const { data } = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code
    }, { headers: {Accept: 'application/json'} });

    if (!data.access_token) {
      res.json({
        status: false,
        error: 'no token from github service',
      });
      return;
    }

    const user = await User.findOne({_id:req.userId});

    if (user == null) {
      res.json({
        status: false,
        error: 'User not found.',
      });
      return;
    }

    user.githubToken = data.access_token

    await user.save();

    res.send({status: true})

  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: false,
      error: 'internal validate error',
    });
  }
};

module.exports = validate;
