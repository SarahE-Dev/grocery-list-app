const mongoose = require('mongoose');

const grocerySchema = new mongoose.Schema({
    grocery: {
        type: String
    },
    purchased: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    },
    priority: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('grocery', grocerySchema)