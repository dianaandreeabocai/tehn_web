const express = require('express');
const router = express.Router();
const Project = require('../db/entities/Project')
const User = require("../db/entities/User");
const Evaluator = require("../db/entities/Evaluator");

router.get('/', async function (req, res) {
  const project = await Project.findOne({
    include: [{
      model: Evaluator
    }],
    where: {id: req.query.id}
  })
  res.status(200).json(project);
})

router.get('/all', async (req, res) => {
  res.status(200).json(await (Project.findAll({
    include: [{
      model: Evaluator
    }]
  })))
})

router.post('/', async (req, res) => {
  const project = await Project.create(req.body)
  const user = await User.update(
    {projectId: project.id, role: 'student-mp'},
    {where: {id: req.query.id}}
  )

  res.status(200).json(project);
})
module.exports = router;
