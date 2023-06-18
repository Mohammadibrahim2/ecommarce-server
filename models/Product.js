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
    brand:{
        type:String
    },
    countInStock:{
    type:Number
    },
    dateCreated:{
        type:Date
    },
    rating:{
        type:Number
    },
    category:{
        type:String
    }

   
})
module.exports=productSchema