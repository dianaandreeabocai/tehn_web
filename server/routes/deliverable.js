const express = require('express');
const router = express.Router();
const Project = require('../db/entities/Project')
const User = require("../db/entities/User");
const Deliverable = require('../db/entities/Deliverable');
router.get('/', async function(req, res) {
  const deliverable = await  Deliverable.findAll({where: {projectId: req.query.id}})
  res.status(200).json(deliverable);
})

router.post('/', async (req,res) => {
  const deliverable = await Deliverable.create({...req.body, projectId: req.query.id})
  res.status(200).json(deliverable);
})
module.exports = router;
