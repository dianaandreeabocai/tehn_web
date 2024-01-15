const express = require('express');
const auth = require('../routes/auth');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/users', auth)
module.exports = app;