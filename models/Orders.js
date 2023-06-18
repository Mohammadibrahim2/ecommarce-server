const mongoose = require('mongoose');

const orderSchema= mongoose.Schema({
    name:{
        type:String,
        
    },
    price:{
        type:String
    },
    description:{
        type:String
    },
    brand:{
        type:String
    },
    countInStock:{
    type:Number
    },
    dateCreated:{
        type: Date, 
        required: true, 
        default: Date.now
    },
    rating:{
        type:Number
    },
    category:{
        type:String
    }

   
})
module.exports=orderSchema