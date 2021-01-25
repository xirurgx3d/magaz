const {mongo} = require('../config/conect')
const mongoose = require('mongoose');

const curse = new mongoose.Schema({
    title: {
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    url:String,
    userID:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'users'
    }
})



module.exports = mongoose.model('curses',curse)
