const servicesAction = require('../../actions');
const Instance = require('../../database/Instance');

const verifyAction = (action) => {
  if (typeof action !== 'object') { throw Error('wrong type on action'); }
  if (typeof action.name !== 'string'
      || typeof action.serviceName !== 'string'
      || typeof action.displayName !== 'string'
      || typeof action.webhookId !== 'string'
      || action.params !== undefined) { throw Error('wrong member type of action widget'); }

  const serviceMetadata = servicesAction.find((svc) => svc.name === action.serviceName);
  if (serviceMetadata === undefined) { throw Error('action invalid service'); }

  const widgetMetadata = serviceMetadata.widgets.find((wdg) => wdg.name === action.name);
  if (widgetMetadata === undefined) { throw Error('action invalid widget'); }

  const invalidParams = widgetMetadata.params.some((p) => {
    if (!(p.name in action.params) || action.params[p.name] === p.type) {
      return true;
    }
    return false;
  });
  if (invalidParams) { throw Error('action invalid parameter'); }
};

const verifyReaction = (reaction) => {
  if (typeof reaction !== 'object') { throw Error('wrong type on reaction'); }
  if (typeof reaction.name !== 'string'
      || typeof reaction.serviceName !== 'string'
      || typeof reaction.displayName !== 'string'
      || typeof reaction.params !== 'object') { throw Error('wrong member type of reaction widget'); }

  const serviceMetadata = servicesAction.find((svc) => svc.name === reaction.serviceName);
  if (serviceMetadata === undefined) { throw Error('reaction invalid service'); }

  const widgetMetadata = serviceMetadata.widgets.find((wdg) => wdg.name === reaction.name);
  if (widgetMetadata === undefined) { throw Error('reaction invalid widget'); }

  const invalidParams = widgetMetadata.params.some((p) => {
    if (!(p.name in reaction.params) || reaction.params[p.name] === p.type) {
      return true;
    }
    return false;
  });
  if (invalidParams) { throw Error('reaction invalid parameter'); }
};

const createInstance = async (req, res) => {
  const { action, reaction } = req.body;
  const { userId } = req;

  console.log(action);

  try {
    verifyAction(action);
    verifyReaction(reaction);

    const instance = new Instance({
      userId,
      action,
      reaction,
    });

    console.log(instance);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statsu: false,
      error: 'internal error',
    });
    return;
  }

  res.json({
    status: true,
  });
};

module.exports = createInstance;
