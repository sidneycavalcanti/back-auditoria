// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./models');
const routes = require('./routes');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
});
