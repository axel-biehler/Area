const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'Card added to board',
  description: 'This trigger fires every time a card is added to a specific board.',
  params: [
    {
      name: 'workspace',
      type: 'string',
      placeholder: 'Please Select',
    },
    {
      name: 'board',
      type: 'string',
      placeholder: '',
    },
  ],
};

module.exports = metadata;
