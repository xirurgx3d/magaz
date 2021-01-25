var express = require('express');
var router = express.Router();
let fs = require('fs')
let path = require('path')
const orders = require('../models/md_orders')

router.get('/', async (req,res)=>{
    const or = await orders.findOne({'user.userID':req.user._id}).populate('user.userID').populate('curse.curseID')
    or.curse.map((val,index)=>{
        //console.log(val)
    })
    console.log(or)
    res.render('patrials/orders',{curse:or});
})

router.post('/', async (req,res)=>{
    try {
        const cur = await req.user.populate('cart.items.curseID').execPopulate() //await users.find({}).populate('cart.items.curseID')
        //
        const curses = cur.cart.items.map((val,index)=>  {
            return {curseID:val.curseID._id}
        })
        //console.log('cur',curses)
        const ord = new orders({
            user:{
                name:req.user.name,
                userID:req.user
            },
            curse:curses
        })
        //console.log('ord', ord)
        await ord.save()
        //await req.user.clearcart
    } catch (error) {
        console.log(error)
    }
    res.render('patrials/orders',{curse:''});
})

module.exports = router;