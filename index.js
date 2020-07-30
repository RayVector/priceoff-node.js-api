const express = require('express');
const app = express();
const config = require('./configs/main');
const {port} = config;

// require controllers:
const homeController = require('./controller/homeController');

// controllers routes:
app.use('/', homeController);

// listen on port
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));