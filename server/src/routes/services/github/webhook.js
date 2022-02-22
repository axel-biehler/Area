const Actions = require('../../../actions');
const runInstance = require('../../instances/runInstance');

const webhook = async (req, res) => {
  try {
    console.log('\n\n\nheader begin:\n\n', req.headers, '\n\nheader end\n\n');
    console.log('\n\n\nbody begin:\n\n', req.body, '\n\nbody end\n\n');

    // TODO: faire la vérification de l'origine du POST

    if (req.headers['x-github-event'] === 'ping') {
      res.status(200).json({ status: true });
      return;
    }

    const service = Actions.find((svc) => svc.name === 'github');
    const action = service.widgets.find(({ event }) => event === req.headers['x-github-event']);

    if (!action) {
      res.status(500).json({
        status: true,
        message: 'Event not yet implemented',
      });
      return;
    }

    await runInstance(req.headers['x-github-hook-id']);

    res.status(200).json({
      status: true,
      message: 'Webhook successfuly received',
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: false,
      error: 'internal endpoint error',
    });
  }
};

module.exports = webhook;
