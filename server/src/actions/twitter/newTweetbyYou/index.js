const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'New tweet by you',
  description: 'This trigger fires every time you post new tweet.',
  params: [
    {
      name: 'retweets',
      type: 'boolean',
      placeholder: '',
    },
    {
      name: '@replies',
      type: 'boolean',
      placeholder: '',
    },
  ],
};

module.exports = metadata;
