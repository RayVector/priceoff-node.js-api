const { user, password, dataBase } = require('./DB')

module.exports = {
  PORT: process.env.PORT || 3001,
  API_URL: '/api/',
  MONGODB_URL: `mongodb+srv://${user}:${password}@priceoff.gvt93.mongodb.net/${dataBase}?retryWrites=true&w=majority`,
  SECRET: 'winterIsComing',
  COOKIE: {
    MAX_AGE: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
  CORS: { credentials: true, origin: true },
}