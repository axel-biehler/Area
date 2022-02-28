const Actions = require('../../../actions');
const runInstance = require('../../instances/runInstance');
const Instance = require('../../../database/Instance');

const webhook = async (req, res) => {
  try {
    console.log('\n\n\nheader begin:\n\n', req.headers, '\n\nheader end\n\n');
    console.log('\n\n\nbody begin:\n\n', req.body, '\n\nbody end\n\n');

    // TODO: faire la vérification de l'origine du POST

    if (req.headers['x-github-event'] === 'ping') {
      res.status(200).json({ status: true });
      return;
    }

    // Filters the createBranch action

    if (req.headers['x-github-event'] === 'create' && req.body.ref_type === 'tag') {
      console.log('\n\nGOOD REDIRECTION OF CREATE TAG\n\n');
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

    // Temporary filter for event that call api for multiple action

    if (Object.prototype.hasOwnProperty.call(req.body, 'action') && req.body.action !== 'opened') {
      console.log('action is not wanted');
      res.status(200).json({ status: true });
      return;
    }

    // Get all instances linked to this webhook

    const webhookId = req.headers['x-github-hook-id'];
    const instances = await Instance.find({ 'action.webhookId': webhookId });

    if (!instances.length) {
      throw Error('instance not found');
    }

    // verification of the integrety of the webhook id
    await instances.forEach(async (instance) => {
      // const params = instance.action.params.reduce((a, b) => ({ ...a, [b.name]: b.value }), {});

      if (instance.action.webhookId.toString() !== webhookId) {
        throw Error('not your instance');
      }
    });

    await runInstance(instances);

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
