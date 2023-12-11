const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: { type: String, required: true },
    credits:{type: Number, required: true},
    date: { type: Date, required: true, default: Date.now },
    
});

module.exports = mongoose.model('Courses', courseSchema);

