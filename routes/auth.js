var express = require('express');
var router = express.Router();
var session = require('express-session')

router.get('/login', (req,res)=>{
    
    res.render('auth/login','');
})
router.get('/register', (req,res)=>{
    res.render('auth/register','');
})

router.post('/login', async (req,res)=>{
    const user = await User.findById('6005a327b5a56d27ec0bb8d8')
    req.user = user
    req.session.autif = true
    
    res.redirect('/');
})


module.exports = router;