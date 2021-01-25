const {mongo} = require('../config/conect')
const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    cart:{
        items:[
            {
                count:Number,
                curseID:{
                    type:mongoose.SchemaTypes.ObjectId,
                    ref:'curses'
                }
            }
        ]
    }
})

UserShema.methods.addTocart = function(curse) {
    //
    const clonecart = [...this.cart.items]
    
    const idx = clonecart.findIndex(c =>{
        //console.log(c._id,curse)
        return c._id.toString() === curse._id.toString()
    })
    
    if(idx >= 0){
        clonecart[idx].count = clonecart[idx].count + 1
        
    }else{
        clonecart.push({
            count:1,
            curseID:curse._id
        })
    }

    //this.cart = {items:[]}
    this.cart = {items:clonecart}
    return this.save()
    
}
UserShema.methods.clearcart = function() {
    this.cart.items = []
    return this.save()
}


module.exports = mongoose.model('users',UserShema)
