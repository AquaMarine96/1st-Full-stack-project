const express = require('express');
const router = express.Router();
const User = require('../../server/models/user');
const News = require('../../server/models/news');
const Course = require('../../server/models/courses');



//Root GET
router.get('/',async (req,res) =>{
    //await User.deleteMany({});
    //create admins
    //await User.create({username: 'admin1', email: 'admin1@admin', password: 'admin1', status:"admin", isAdmin: true});
    res.render('login', {layout: false, title: 'Welcome to User Compass'})
});
   



router.get('/homepage', async (req, res) => {
    try{
        const perPage = 5;
        let page = req.query.page || 1;
        const news = await News.aggregate([{$sort: {added: -1}}]).skip(perPage * page - perPage).limit(perPage).exec();
        
        const totalNews = await News.count().lean();
        const nextPage = parseInt(page) + 1;
        const prevPage = parseInt(page) - 1;
        const hasNextPage = nextPage <= Math.ceil(totalNews / perPage);
        const hasPrevPage = prevPage >= 1;
        
        res.render('homepage', {
          layout: 'main', title: 'Homepage', news,  
          current: page, nextpage: hasNextPage ? nextPage : null,
          prevpage: hasPrevPage ? prevPage : null,
        });
        
        console.log(`Logged in as: ${User.username}`);        
    }catch(error){
        console.log(error);
    }
});

router.get('/schedule', (req,res) =>{

    try{
        const User = User.findOne();       
        res.render('schedule', {layout: 'main', title: 'Schedule', username: User.username});
        console.log(`Schedule`);
        
    }catch(error){
        console.log(error);title
    }
});


//Sign up POST

router.post('/login', async (req,res) =>{
    try{
        let {username, email, password} = req.body;
        
        const user = (await User.create({username, email, password})).toJSON();
        console.log(`user: ${user.username} created`);
        
        //await User.count().lean();
        
        res.render('homepage', {layout: 'main', title: 'Homepage', user});
    
    }catch(error){
        console.log(error);
    }

})


//Login POST


router.post('/homepage', async (req,res) =>{
    try{
        
        const user = await User.findOne({username: req.body.username, password: req.body.password}).lean();
        if (user){
            const perPage = 5;
            let page = req.query.page || 1;
            const news = await News.aggregate([{$sort: {added: -1}}]).skip(perPage * page - perPage).limit(perPage).exec();
            
            const totalNews = await News.count().lean();
            const nextPage = parseInt(page) + 1;
            const prevPage = parseInt(page) - 1;
            const hasNextPage = nextPage <= Math.ceil(totalNews / perPage);
            const hasPrevPage = prevPage >= 1;
            
            res.render('homepage', {
            layout: 'main', title: 'Homepage', news,  
            current: page, nextpage: hasNextPage ? nextPage : null,
            prevpage: hasPrevPage ? prevPage : null, user
            });
            console.log(`user: ${user.username} logged in`);
        }
        else{
            res.render('login', {layout: false, title: 'Welcome to User Compass'});
            console.log(`user not found`);
        }
        
        
    }catch(error){
        console.log(error);
    }

})


module.exports = router;




