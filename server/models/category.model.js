var mongoose = require('mongoose')

const Category = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})


var CategoryModel = mongoose.model("Categories", Category)

module.exports = CategoryModel