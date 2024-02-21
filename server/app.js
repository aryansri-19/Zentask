var express = require('express')
var cors = require('cors')
var app = express()
var mongoose = require('mongoose')
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/zentask", { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("MongoDB connected")
})
.catch((e)=>{
    console.log("Error occured", e)
})

const routes = require('./routes')
app.use('/', routes)

app.listen(8080, ()=>{
    console.log("Connection established")
})
