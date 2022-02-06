const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'Twitter',
  description: 'Twitter social media',
  needsOauth: true,
};

module.exports = metadata;
