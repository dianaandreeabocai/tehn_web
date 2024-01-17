const express = require('express');
const auth = require('../routes/auth');
const project = require('../routes/project');
const deliverable = require('../routes/deliverable');
const evaluator = require('../routes/evaluator');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/users', auth);
app.use('/project', project);
app.use('/deliverable', deliverable);
app.use('/evaluator', evaluator);
module.exports = app;
