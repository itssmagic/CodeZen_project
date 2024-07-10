const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        Required: true
    },
    lastname: {
        type: String,
        Required: true
    },
    email: {
        type: String,
        unique: true,
        Required: true
    },
    password: {
        type: String,
        Required: true
    },
})

module.exports = mongoose.model('User',userSchema);