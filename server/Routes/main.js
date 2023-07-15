const express = require('express');
const router = express.Router();



router.get('/', (req,res) =>{
    res.render('login', {layout: false})});


router.get('/homepage', (req, res) => {
    res.render('homepage', {layout: 'main'});
});
module.exports = router;
