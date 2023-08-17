var mongoose = require('mongoose')

const Task = mongoose.Schema({
    task_name:{
        type: String,
        required: true,
    },
    cat:{
        type: String,
        required: true,
    },
    start_date:{
        type: String,
        required: true,
    },
    start_time:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    done:{
        type: Number,
        default: 0
    }
})

var TaskModel = mongoose.model("Task", Task)

module.exports = TaskModel