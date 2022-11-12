

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const adminSchema = new Schema({
    firstname: {
        type: String,
    },
    lastname: {
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

module.exports = { Admin: mongoose.model('Admin', adminSchema) };

