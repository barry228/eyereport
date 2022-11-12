const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

//create schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    phonenumber: {
        type: Number,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },

});


module.exports = { User: mongoose.model('User', userSchema) };
