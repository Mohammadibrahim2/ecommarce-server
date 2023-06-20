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
    createdAt:{
        type: Date, 
        required: true, 
        default: Date.now
    },
    rating:{
        type:Number
    },
    category:{
        type:String
    },
    orderItems:[{
        type:String
    }],
    country:{
        type:String
    },
    phone:{
        type:Number
    },
    totalPrice:{
        type:Number
    },
    user:{
        type:String
    }

   
})
module.exports=orderSchema