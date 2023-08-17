const express = require('express')
const router = express.Router()
const UserModel = require('../models/user.model')

router.post('/register', async(req, res)=>{
    const user = req.body
    console.log(user)
    try{
        const check = await UserModel.findOne({username:user.username, password: user.password})
        if(check)
            res.json("exist")
        else
        {   res.json("not exist")
            await UserModel.insertMany([user])
        }
    }
    catch(e){
        res.status(500).json({ error: "Internal Server Error"})
    }
})

module.exports = router