const express = require('express');
const config = require('./configs/main');
const {PORT, API_URL, MONGODB_URL} = config;
const cors = require('cors');
const mongoose = require('mongoose');

/**
 * express
 * @type {app}
 */
const app = express();

/**
 * CORS
 */
app.use(cors({credentials: true, origin: true}));

/**
 * Routes
 */
app.use(`${API_URL}users`, require('./routes/users'));
app.use(`${API_URL}categories`, require('./routes/categories'));

/**
 * DB:
 */
async function start() {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('MongoDB successfully connected');
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  } catch (e) {
    console.log(e)
  }
}


/**
 * Start
 */
start();

