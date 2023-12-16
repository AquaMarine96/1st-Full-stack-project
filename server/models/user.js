const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    profilePic:{type: String, default:'C:\Users\andre\OneDrive\Desktop\ACADEMICS\ΣΧΟΛΗ\Web\Student-Compass\public\images\profilepic.png'},
    username:{type: String, required: true},
    email:{type: String, required: true},
    password:{ type: String, required: true},
    status:{type: String,default: 'user'},
    joined:{type: Date, default: Date.now()},
    updatedAt:{type: Date, default: Date.now()},
    isAdmin:{type: Boolean, default: false},
    selectedCourses:[],
    about:{type: String, default: ''}
    
});

module.exports = mongoose.model('User', userSchema);