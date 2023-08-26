var mongoose = require('mongoose')

const Category = mongoose.Schema({
    user:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
})


var CategoryModel = mongoose.model("Categories", Category)

module.exports = CategoryModel