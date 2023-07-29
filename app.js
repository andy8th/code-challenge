const express = require('express');
const routes = require('./src/routes/routes');
const sequelize = require('./src/config/db');
require('dotenv').config({ path: './.env' });

const app = express();

app.use(express.json()); // This middleware is used to parse JSON bodies

app.use('/api/v1', routes);

// Sync models with database
sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(err => console.log(err));
  