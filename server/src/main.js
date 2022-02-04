const express = require('express');
const cors = require('cors');
const database = require('./database');
const routes = require('./routes');

const main = async () => {
  const app = express();
  const port = process.env.PORT || 8080;

  app.use(cors());
  app.use(express.json());
  app.use('/auth', routes.authentication);
  app.use('/profile', routes.profile);
  app.use('/services', routes.services);
  app.use('/actions', routes.actions);
  app.use('/reactions', routes.reactions);
  app.use('/about.json', routes.about);

  await database.database.connectToDatabase();
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}.`);
  });
};

main();
