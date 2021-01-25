var express = require('express');
var router = express.Router();
let fs = require('fs')
let path = require('path')
const curse = require('../models/md_curse')
const users = require('../models/md_users')

router.get('/', async (req,res)=>{
    try {
        const cur = await req.user.populate('cart.items.curseID').execPopulate() //await users.find({}).populate('cart.items.curseID')
        //
        
        const cart = cur.cart.items.map((val,index)=> val.curseID)
        res.render('patrials/cart',{curs:cart});
    } catch (error) {
        console.log(error)
    }
    
})
router.get('/add/:id', async (req,res)=>{
    
    //
    try {
        const curs = await curse.findOne({title:req.params.id})
        await req.user.addTocart(curs._id)
        //console.log(curs)
        res.render('patrials/cart',{curs:''});
    } catch (error) {
        console.log(error)
    }

    
})
router.get('/delet/:id', async (req,res)=>{
    try {
       const del = await curse.findOneAndDelete({title:req.params.id})
       console.log(del)
    } catch (error) {
        
    }
})


module.exports = router;