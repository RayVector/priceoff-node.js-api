const {user, password, dataBase} = require('./DB');

module.exports = {
  PORT: process.env.PORT || 3000,
  API_URL: '/api/',
  MONGODB_URL: `mongodb+srv://${user}:${password}@priceoff.gvt93.mongodb.net/${dataBase}?retryWrites=true&w=majority`,
};