const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
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