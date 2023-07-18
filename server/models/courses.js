const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now() },
    status:{type: String, required: true, default: 'user'}
});

module.exports = mongoose.model('Course', courseSchema);

