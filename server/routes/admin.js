//This page refers to the routes of the user. 


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
        const perPage = 5;
        let page = req.query.page || 1;
        const news = await News.aggregate([{$sort: {added: -1}}]).skip(perPage * page - perPage).limit(perPage).exec();
        
        const totalNews = await News.count().lean();
        const nextPage = parseInt(page) + 1;
        const prevPage = parseInt(page) - 1;
        const hasNextPage = nextPage <= Math.ceil(totalNews / perPage);
        const hasPrevPage = prevPage >= 1;

        const decoded = jwt.verify(req.cookies.token, jwtSecret)
        const user = await User.findById(decoded.id).lean();
        console.log(news)
        res.render('home', { layout: 'dashboard',
           title: 'Edit Homepage', news,  
          current: page, nextpage: hasNextPage ? nextPage : null,
          prevpage: hasPrevPage ? prevPage : null, user
        });
        console.log(user)
    }catch(error){
        console.log(error);
    }
});

//Admin Login

router.post('/home', async (req,res) =>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username}).lean();
        if (!user){ 
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

module.exports = router;