var mongoose = require("mongoose")

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
var Usermodel = mongoose.model("user", User)

module.exports = Usermodel