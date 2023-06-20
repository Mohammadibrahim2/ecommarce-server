const mongoose = require('mongoose');

const productSchema= mongoose.Schema({
    name:{
        type:String,
        
    },
    price:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String,
        default:''

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
    }

   
})
module.exports=productSchema