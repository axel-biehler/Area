const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'Card added to board',
  description: 'This trigger fires every time a card is added to a specific board.',
  params: [
    {
      name: 'workspace',
      type: 'get',
      route: 'tkt bro',
      placeholder: 'Please select',
    },
    {
      name: 'board',
      type: 'get',
      route: 'tkt bro 2',
      placeholder: 'Please select',
    },
  ],
};

module.exports = metadata;
