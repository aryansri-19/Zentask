import TaskModel from './task.model';
import UserModel from './user.model';
var mongoose = require('mongoose')

const Team = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    leader_id:{
        type: String,
        required: true
    },
    members: {
        type: Array<UserModel>[],
        required: true
    },
    tasks : {
        type: Array<TaskModel>[],
        required: true
    }
})

var TeamModel = mongoose.model('Teams', Team)
module.exports = TeamModel