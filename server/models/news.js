const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: { type: String},
    content: { type: String},
    added: { type: Date, default: Date.now() }
})



module.exports =  mongoose.model('News', newsSchema);