var express = require('express');
var router = express.Router();
let fs = require('fs')
let path = require('path')
const curse = require('../models/md_curse')

const ouploadDir = path.join(path.resolve('data'),'curse.json')
router.get('/', async function(req, res, next) {

    try {
      const curses = await curse.find({userID:req.user._id}).populate('userID')
      //console.log(curses)
      res.render('patrials/curse',{curs:curses});
    } catch (error) {
      console.log(error)
    }

    /*
    fs.readFile(ouploadDir,(err,data)=>{
      if(err) console.log(err)
      
      let curses = JSON.parse(data)
  
      res.render('patrials/curse',curses);
    })
    */

    
  });
  router.get('/:id', async function(req, res, next) {
    try {
      const curses = await curse.findOne({title:req.params.id}).select('title -_id')
    res.render('patrials/curse_item',{title:curses.title});
    } catch (error) {
      console.log(error)
    }
    
  });
  
  router.get('/edit/:id', async function(req, res, next) {
    try {
      const curses = await curse.findOne({title:req.params.id},).select('-_id')
      //const curses = await curse.findOneAndUpdate({title:req.params.id},).select('title -_id')
      res.render('patrials/edit',{curse:curses});
    } catch (error) {
      console.log(error)
    }
    /*
    if(req.query.aswon == 'true'){
      fs.readFile(ouploadDir,(err,data)=>{
        if(err) console.log(err)
        
        let curses = JSON.parse(data)
    
        res.render('patrials/edit',curses);

      })
    }
    */
  
  });
  router.post('/edit', async function(req, res) {
    try {
      const {id} = req.body
      delete req.body.id
      const curses = await curse.findOneAndUpdate({title:id},req.body)
      
      res.redirect('/curse');
    } catch (error) {
      console.log(error)
    }
    /*
    fs.writeFile(ouploadDir,JSON.stringify(req.body),(err)=>{
      if(err) console.log(err)
      res.redirect('/curse');
    })
    */
    

    
  
  });



module.exports = router;  