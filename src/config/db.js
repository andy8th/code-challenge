const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgres'
});

sequelize.authenticate()
  .then(() => {
  console.log('Database connection established.')
  return sequelize.sync({ alter: true });
})
  .catch(err => console.log('Test query failed:' + err))
  

module.exports = sequelize;
