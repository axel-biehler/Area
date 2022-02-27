const env = async (req, res) => {
  try {
    res.send({
      status: true,
      clientId: process.env.DISCORD_CLIENT_ID,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: false,
      error: 'internal env error',
    });
  }
};

module.exports = env;
