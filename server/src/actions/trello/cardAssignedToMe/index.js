const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'Card assigned to me',
  description: 'his Trigger fires every time a card is assigned to you.',
  params: [
    {
      name: 'workspace',
      type: 'string',
      placeholder: 'Please select',
    },
    {
      name: 'board',
      type: 'string',
      placeholder: 'Please select',
    },
  ],
};

module.exports = metadata;
