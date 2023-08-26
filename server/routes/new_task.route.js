const express = require('express')
const router = express.Router()
const TaskModel = require('../models/task.model')

router.get('/all_tasks', async (req, res)=>{
  try{
    const tasks = await TaskModel.find({user_id: req.query.id})
    res.status(200).send(tasks)
  } catch{
    res.status(500).send({ error: "Could not get tasks" })
  }
})

router.post('/new_task', async (req, res) => {
  const task = req.body
  try {
    TaskModel.insertMany([task])
    res.status(200).send({ message: "Task added"})
  } catch (e) {
    res.status(500).send({ error: "Could not add task"})
  }
});

module.exports = router;
