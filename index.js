const express = require('express');
const config = require('./configs/main');
const {port, apiUrl} = config;

const app = express();

// controllers routes:
app.use(`${apiUrl}get-user`, require('./routes/user'));
app.use(`${apiUrl}get-categories`, require('./routes/categories'));

// listen on port
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));