const env = async (req, res) => {
  try {
    res.send({
      status: true,
      clientId: process.env.GITHUB_CLIENT_ID,
      state: process.env.GITHUB_RANDOM_STATE
    })
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: false,
      error: 'internal env error',
    });
  }
};

module.exports = env;
