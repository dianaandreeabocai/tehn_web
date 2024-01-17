const express = require('express');
const router = express.Router();
const {Op} = require('sequelize')
const Evaluator = require('../db/entities/Evaluator');
router.post('/', async (req, res)=> {
  const evaluator = await Evaluator.update(
    {projectId: req.query.projectId}, {
      where: {
        projectId: null,
        id: {[Op.not]: req.query.id}
      },
      limit: 3
    })


  res.status(200).json(evaluator);
})

router.post('/grade', async (req, res) => {
  const evaluator = await Evaluator.update(
    {grade: req.body.grade}, {
      where: {
        id: req.body.evaluatorId
      }
    })
  res.status(200).json(evaluator);
})
module.exports = router;
