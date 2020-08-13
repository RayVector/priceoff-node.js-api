const express = require('express');
const app = express();
const config = require('./configs/main');
const {port, apiUrl} = config;

// require controllers:
const userController = require('./controller/userController');
const categoriesController = require('./controller/categoriesController');

// controllers routes:
app.use(`${apiUrl}get-user`, userController);
app.use(`${apiUrl}get-categories`, categoriesController);

// listen on port
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));