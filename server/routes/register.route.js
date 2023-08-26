const express = require('express')
const router = express.Router()
const UserModel = require('../models/user.model')

router.post('/register', async(req, res)=>{
    const user = req.body
    console.log(user)
    try{
        const check = await UserModel.findOne({email:user.email, password: user.password})
        if(check)
        {
            res.json({ status: "exist", username: check.username })
        }
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