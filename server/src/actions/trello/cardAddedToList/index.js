const path = require('path');

const metadata = {
  name: path.basename(__dirname),
  displayName: 'Card added to list',
  description: 'This trigger fires every time a card is added to specified list',
  event: 'action_create_card',
  params: [
    {
      name: 'board',
      type: 'get',
      route: '/services/trello/boards',
      placeholder: 'Please select',
    },
    {
      name: 'list',
      type: 'get',
      route: '/services/trello/listsOnBoard',
      placeholder: 'Please select',
    },
  ],
};

module.exports = metadata;
