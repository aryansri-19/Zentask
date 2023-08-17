const express = require('express')
const router = express.Router()
const TaskModel = require('../models/task.model')
const CategoryModel = require('../models/category.model')

router.post('/delete-task', async (req, res)=>{
    const task = req.body.task_name
    try{
        await TaskModel.deleteOne({task_name: task, done: 0})
        .then(res.sendStatus(200))
    }
    catch{
        res.sendStatus(500)
    }
})

router.post('/update-task', async (req, res)=>{
    var {task_name, done} = req.body
    try{
        await TaskModel.updateOne({task_name: task_name, done: 0}, {done: done})
        .then(res.sendStatus(200))
    }
    catch{
        res.sendStatus(500)
    }
    
})

router.post('/delete_cat', async (req, res)=>{
    const cat = req.body.name
    try{
        await CategoryModel.deleteOne({cat: cat})
        .then(res.sendStatus(200))
    }
    catch{
        res.sendStatus(500)
    }
})

module.exports = router