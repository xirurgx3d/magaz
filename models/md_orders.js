const {mongo} = require('../config/conect')
const mongoose = require('mongoose');

const ordersShema = new mongoose.Schema({
    user:{
        name:String,
        userID:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'users'
        }
    },
    curse:[{
            count:Number,
            curseID:{
                type:mongoose.SchemaTypes.ObjectId,
                ref:'curses'
            }
        }]
    
})

module.exports = mongoose.model('orders',ordersShema)