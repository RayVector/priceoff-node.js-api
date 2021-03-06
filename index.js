const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const config = require('./configs/main')
const cors = require('cors')
const mongoose = require('mongoose')
const user = require('./middleware/user')
const { PORT, API_URL, MONGODB_URL, SECRET } = config


/**
 * express
 * @type {app}
 */
const app = express()

/**
 * JSON communicate
 */
app.use(express.json())

/**
 * CORS
 */
app.use(cors(config.CORS))

/**
 * DB
 * TODO: rename collection to 'sessions' + DB to
 */
const store = new MongoDBStore(
  {
    uri: MONGODB_URL,
    databaseName: 'priceOff',
    collection: 'session',
  })
// Catch errors
store.on('error', error => {
  console.log(error)
})

app.use(session({
  secret: SECRET,
  cookie: {
    maxAge: config.COOKIE.MAX_AGE,
  },
  store: store,
  resave: true,
  saveUninitialized: true,
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  },
}))

/**
 * middleware
 */
app.use(user)

/**
 * Routes
 */
app.use(`${API_URL}user`, require('./routes/user'))
app.use(`${API_URL}categories`, require('./routes/categories'))
app.use(`${API_URL}login`, require('./routes/login'))
app.use(`${API_URL}product`, require('./routes/product'))

/**
 * Init
 * @returns {Promise<void>}
 */
async function start() {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    console.log('MongoDB successfully connected')
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
  } catch (e) {
    console.log(e)
  }
}


start()

