var express = require('express');
var router = express.Router();
let fs = require('fs')
let path = require('path')
const curse = require('../models/md_curse')

router.get('/', function(req, res, next) {
    
    
    res.render('patrials/add', { title: 'добавить курс' });

  });

router.post('/', async function(req, res, next) {
    const {text,price,url} = req.body
    const cur = new curse({
        title:text,
        price:price,
        url:url,
        userID:req.user._id
    })

    try {
        cur.save()
        res.redirect('/curse')
    } catch (error) {
        console.log(error)
    }
    /*
    const ouploadDir = path.join(path.resolve('data'),'curse.json')
    fs.readFile(ouploadDir,err =>{
        if(err) console.log(err)
        fs.appendFile(ouploadDir,JSON.stringify(req.body),(err)=>{
            if(err) console.log(err)
            res.send('ok')
        })
    })
    */

});  

  module.exports = router;
