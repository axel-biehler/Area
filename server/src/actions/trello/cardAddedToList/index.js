const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'Card added to list',
  description: 'This trigger fires every time a card is added to specified list',
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
    {
      name: 'list',
      type: 'string',
      placeholder: '',
    },
  ],
};

module.exports = metadata;
