const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create schema
const reportSchema = new Schema({
    location: {
        type: String,
    },
    report: {
        type: String,
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    }


});

module.exports = { Report: mongoose.model('Report', reportSchema) };

