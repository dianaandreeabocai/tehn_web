const app = require('./app/app');
const User = require('./db/entities/User')
const Project = require('./db/entities/Project');
const Deliverable = require('./db/entities/Deliverable')
const Evaluator = require('./db/entities/Evaluator');

User.hasOne(Evaluator, {foreignKey: 'userId'});
Project.hasMany(User, {foreignKey: 'projectId'});
Project.hasMany(Deliverable, {foreignKey: 'projectId'});
Project.hasMany(Evaluator, {foreignKey: 'projectId'});

app.get('/', async function (req, res) {
    const evaluator = await Project.findAll({
        include: [{
          model: Evaluator,
          where: {projectId: 1}
         }]
      })
    res.status(200).json(evaluator);
    
})

app.post('/', async function(req,res) {
   const user = await User.create({
        username: 'dianaBocai2',
        email: 'dianaBocai2@test.com',
        password:'$2a$12$xSQ9JiN4qHFXlAXPCF9c8eAXI7Wj.MvFnoz7IOfVmOk5u4Ndh582W',
        role: 'student'
    })
    res.status(200).json(user);
})

app.post('/evaluator', async function(req, res) {
    const evaluator = await Evaluator.create({
        grade: 0,
        userId: 1
    })
    res.status(200).json(evaluator);
})

app.post('/project', async (req,res) => {
    const project = await Project.create({
        description: 'test',
        externalUrl: 'http://test.com',
        name: 'new project'
    })

    const user = await User.update(
     { projectId: project.id },
     { where: { id: 1 } }
    )

    res.status(200).json(user);
})

app.post('/nota', async(req,res) => {
    const evaluator = await Evaluator.update(
        {grade: 9.5, projectId: 1},
        {where: {id: 1}}
    )
    res.status(200).json(evaluator);
})
  
app.listen(4000);