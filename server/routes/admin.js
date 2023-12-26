//This page refers to the routes of the admin. 


const express = require('express');
const router = express.Router();
const User = require('../models/user');
const News = require('../models/news');
const Courses = require('../models/courses');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const jwtSecret = process.env.JWT_SECRET;


//Authorisation- user must be logged in to access the page

const auth = (req,res, next) =>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message: 'You are not authenticated'});
    }
    try{
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    }catch(error){
        res.status(401).json({message: 'You are not authenticated'});
    }
}

//await User.create({username: 'admin1', email: 'admin1@admin', password: 'admin1', status:"admin", isAdmin: true});

//Home GET- Enter to the page

router.get('/home', auth, async (req, res) => {
    try{
        const decoded = jwt.verify(req.cookies.token, jwtSecret)
        const user = await User.findById(decoded.id).lean();
        const perPage = 6;
        let page = req.query.page || 1;
        const news = await News.aggregate([{$sort: {added: -1}}]).skip(perPage * page - perPage).limit(perPage).exec();
        news.forEach(news =>{
            news.added.toDateString();
        })
        const totalNews = await News.count().lean();
        const nextPage = parseInt(page) + 1;
        const prevPage = parseInt(page) - 1;
        const hasNextPage = nextPage <= Math.ceil(totalNews / perPage);
        const hasPrevPage = prevPage >= 1;
        
        
       
        res.render('home', { layout: 'dashboard',
           title: 'Edit Homepage', news,  
          current: page, nextpage: hasNextPage ? nextPage : null,
          prevpage: hasPrevPage ? prevPage : null, user
        });
        
    }catch(error){
        console.log(error);
    }
});

//Home POST- Add a news

router.post('/add-news', auth, async(req,res)=>{
    try{
        const {tit, desc} = req.body;
        const neo = await News.create({title: tit, content: desc});
        res.redirect('/home');
    }catch(error){
        console.log(error);
    }

});

// Home - Delete News

router.post('/delete-news', auth, async(req,res) => {
    try{
        let {newsId} = req.body
        await News.deleteOne({_id: new mongoose.Types.ObjectId(newsId)});
        res.redirect('/home');
    }catch(error){
        console.log(error);
    }
});

//Admin Login

router.post('/home', async (req,res) =>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username}).lean();
        if (!user || user.isAdmin === false){ 
            return res.status(401).json({message: 'Invalid credentials'});
        }
        
        const validPass = await bcrypt.compare(password, user.password);

        if (!validPass){ 
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({id: user._id},jwtSecret);
        res.cookie('token', token, {httpOnly: true});
        res.redirect('/home');
    }catch(error){
        console.log(error);
    }
});


//Get organised courses

router.get('/manage',auth, async (req, res) => {
    try{
        const courses = await Courses.find().lean();      

        const decoded = jwt.verify(req.cookies.token, jwtSecret)
        const user = await User.findById(decoded.id).lean();

        res.render('manage', { layout:'dashboard', title: 'Manage Courses',courses, user});
    }catch(error){
        console.log(error);
    }
});

//Get users set

router.get('/users',auth, async (req, res) => {
    try{
        const users = await User.find({status:'user'}).lean();      

        const decoded = jwt.verify(req.cookies.token, jwtSecret)
        const user = await User.findById(decoded.id).lean();

        res.render('users', { layout:'dashboard', title: 'Manage Users',users, user});
    }catch(error){
        console.log(error);
    }
});

//Create a Course

router.get('/createCourse',auth, async (req, res) => {
    try{
        res.render('createCourse', { layout:'dashboard', title: 'Add Course'});
    }catch(error){

    }
});

router.post('/manage', auth, async(req,res) =>{
    try{
        const {CourseName, CourseCode} = req.body;
        
        
        const course = await Courses.create({title:CourseName, credits:CourseCode});
        res.redirect('/manage');
    }catch(error){
        console.log(error);
    }

});

//Delete a Course

router.post('/delete-course', async (req, res) => {
    try{
        const{courseId} = req.body;
        await Courses.deleteOne({_id:new mongoose.Types.ObjectId(courseId)});
        res.redirect('/manage');
    }catch(error){
        console.log(error);
    }
});

module.exports = router;