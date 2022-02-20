const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'Trello',
  description: 'Trello project gestion tool',
  needsOauth: true,
};

module.exports = metadata;
