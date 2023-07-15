const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const studentSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    joined:{
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Student', studentSchema);