const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{type: String, required: true},
    email:{type: String, required: true},
    password:{ type: String, required: true},
    status:{type: String,default: 'user'},
    joined:{type: Date, default: Date.now()},
    updatedAt:{type: Date, default: Date.now()},
    isAdmin:{type: Boolean, default: false},
    selectedCourses:{type: Array, default: []},
    about:{type: String, default: ''}
    
});

module.exports = mongoose.model('User', userSchema);