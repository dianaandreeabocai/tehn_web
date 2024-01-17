const app = require('./app/app');
const User = require('./db/entities/User')
const Project = require('./db/entities/Project');
const Deliverable = require('./db/entities/Deliverable')
const Evaluator = require('./db/entities/Evaluator');

User.hasOne(Evaluator, {foreignKey: 'userId'});
Project.hasMany(User, {foreignKey: 'projectId'});
Project.hasMany(Deliverable, {foreignKey: 'projectId'});
Project.hasMany(Evaluator, {foreignKey: 'projectId'});


app.listen(4000);
