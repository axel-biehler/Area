const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'Create a channel',
  description: 'This trigger will send create a channel in a "server"',
  params: [
    {
      name: 'name',
      type: 'string',
      placeholder: 'channel name',
    },
    {
      name: 'type',
      type: 'dropdown',
      field: 'name',
      options: [{
        name: 'text channel',
        value: 0,
      }, {
        name: 'voice channel',
        value: 2,
      }, {
        name: 'category channel',
        value: 4,
      }],
      placeholder: 'channel type',
    },
    {
      name: 'topic',
      type: 'string',
      placeholder: 'channel topic',
    },
    {
      name: 'place',
      type: 'get',
      route: '/services/discord/get/channels',
      field: 'name',
      placeholder: 'Choose a category channel to put in',
    },
  ],
};

module.exports = metadata;
