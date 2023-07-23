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



//Root GET- Enter to the page 

router.get('/',async (req,res) =>{
    //await User.updateMany({$set :{about: ''}});

    //create admins

    // const user = await User.create({username: 'admin1', email: 'admin1@admin', password: 'admin1', status:"admin", isAdmin: true});
    // const user = await User.findOne({username: 'admin1'});
    // const hashPass =  await bcrypt.hash(user.password, 10);
    // await user.updateOne({$set: {password: hashPass, email:'admin1@admin.com'}});



    //await makeList();
    //await Courses.updateMany({$set: {id: 1}});
    res.render('login', {layout: false, title: 'Welcome to User Compass'})
});
   


//Route to get the homepage view

router.get('/homepage', auth, async (req, res) => {
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
        
        res.render('homepage', {
           title: 'Homepage', news,  
          current: page, nextpage: hasNextPage ? nextPage : null,
          prevpage: hasPrevPage ? prevPage : null, user
        });
        
                
    }catch(error){
        console.log(error);
    }
});


//Route to get the schedule an courses view

router.get('/schedule', auth,async (req,res) =>{

    try{
        
        const courses = await Courses.find().lean();      

        const decoded = jwt.verify(req.cookies.token, jwtSecret)
        const user = await User.findById(decoded.id).lean();

        res.render('schedule', { title: 'Schedule',courses, user});
        
        
    }catch(error){
        console.log(error);
    }
});


//Route to get the profile view

router.get('/profile', auth, async (req,res) =>{
    try{

        const decoded = jwt.verify(req.cookies.token, jwtSecret)
        const user = await User.findById(decoded.id).lean();


        res.render('profile', {title: 'Profile', user});
    }catch(error){
        console.log(error);
    }
});

//Sign in POST 
//the form for a new user 

router.post('/login', async (req,res) =>{
    try{
        const {username, email, password} = req.body;
        const hashPass = await bcrypt.hash(password, 10);
        const user = await User.create({username, password: hashPass, email});
        
        res.redirect('/');
    
    }catch(error){
        console.log(error);
    }

})



//Login POST for the user to enter might have to check for the admin here as well 


router.post('/homepage', async (req,res) =>{
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
        res.redirect('/homepage');

    }catch(error){
        console.log(error);
    }

});


//Form POST for Course selection

router.post('/schedule', auth, async(req,res) =>{
    
    
    
    try{
        const {checkId} = req.body;
        const decoded = jwt.verify(req.cookies.token, jwtSecret);
        const user = await User.findById(decoded.id).lean();
        //await User.updateOne(user, {$set: { selectedCourses: []}})
        const cc = [checkId];
        console.log(`cc = $`);
        // const selected = [];
        // for(i in cc){
        //     selected.push(cc[i])
        //     //const data = await Courses.findById({_id: cc[i]});
        //     console.log(data.title);
        // }
        await User.updateOne(user,{ $set: { selectedCourses:checkId }});    
        console.log(user)
        res.redirect('/schedule');
        
        
    }catch(error){
        console.log(error);
    }
});

// POST to update the profile

router.post('/profile', auth, async(req,res) =>{
    try{
        const decoded = jwt.verify(req.cookies.token, jwtSecret);
        const user = await User.findById(decoded.id);

        const {username, email, password, isabout} = req.body;
        if(password !== user.password && password !== ''){
            const hashPass = await bcrypt.hash(password, 10);
            await user.updateOne({$set: {password: hashPass }})
        }
        if(username !== user.username && username !== ''){
            await user.updateOne({$set: {username: username}})
        }
        if(email !== user.email && email !== ''){
            await user.updateOne({$set: {email: email}})
        }
        await user.updateOne({$set:{about: isabout }})
        console.log(user.about);
        res.redirect('/profile');
    }catch(error){
        console.log(error);
    }
})


module.exports = router;



// function makeList() {
//     const courses = Courses.insertMany([
        
        
//             {
//             title: "Digital Signal Processing",
//             credits: 3,
//             date: "2023-08-28"
//             },
//             {
//             title: "Electronic Circuits",
//             credits: 4,
//             date: "2023-08-30"
//             },
//             {
//             title: "Communication Systems",
//             credits: 3,
//             date: "2023-09-01"
//             },
//             {
//             title: "Microelectronics",
//             credits: 4,
//             date: "2023-09-05"
//             },
//             {
//             title: "Embedded Systems",
//             credits: 3,
//             date: "2023-09-08"
//             },
//             {
//             title: "Analog Integrated Circuits",
//             credits: 4,
//             date: "2023-09-11"
//             },
//             {
//             title: "VLSI Design",
//             credits: 3,
//             date: "2023-09-14"
//             },
//             {
//             title: "Control Systems",
//             credits: 4,
//             date: "2023-09-16"
//             },
//             {
//             title: "Electromagnetic Fields",
//             credits: 3,
//             date: "2023-09-18"
//             },
//             {
//             title: "Digital Electronics",
//             credits: 3,
//             date: "2023-09-20"
//             }
        
//     ]);}
