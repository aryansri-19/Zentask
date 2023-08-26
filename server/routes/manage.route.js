const express = require('express')
const router = express.Router()
const TaskModel = require('../models/task.model')
const CategoryModel = require('../models/category.model')

router.post('/delete-task', async (req, res)=>{
    const task = req.body.task_name
    const user = req.body.user_id
    try{
        await TaskModel.deleteOne({user_id: user, task_name: task, done: 0})
        .then(res.sendStatus(200))
    }
    catch{
        res.sendStatus(500)
    }
})

router.post('/update-task', async (req, res)=>{
    var {user_id, task_name, done} = req.body
    try{
        await TaskModel.updateOne({user_id: user_id, task_name: task_name, done: 0}, {done: done})
        .then(res.sendStatus(200))
    }
    catch{
        res.sendStatus(500)
    }
    
})

router.post('/delete_cat', async (req, res)=>{
    const cat = req.body.name
    const user = req.body.id
    try{
        await CategoryModel.deleteOne({cat: cat, user_id: user})
        .then(res.sendStatus(200))
    }
    catch{
        res.sendStatus(500)
    }
})

module.exports = router