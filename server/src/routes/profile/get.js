const { User } = require('../../database');

const get = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    res.json({
      username: user.username,
      email: user.email,
      twitterLinked: user.twitterId != null,
      githubLinked: user.github.token != null,
      trelloLinked: user.trelloToken != null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: 'internal error',
    });
  }
};

module.exports = get;
