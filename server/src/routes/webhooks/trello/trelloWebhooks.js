const trelloWebhooks = async (req, res) => {
  console.log(req.body);

  res.json({
    status: true,
  });
};

module.exports = trelloWebhooks;
