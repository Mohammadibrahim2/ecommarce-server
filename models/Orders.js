const mongoose = require('mongoose');


const orderSchema= mongoose.Schema({








    createdAt:{
        type: Date, 
        required: true, 
        default: Date.now
    },
    
    orderItems:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"OrderItem",
        required:true
    }],
    country:{
        type:String
    },
    phone:{
        type:Number
    },
    city:{
        type:String
    },

    shipping:{
        type:String

    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        default:"Pandding",
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    }

   
});
orderSchema.virtual('id').get(function (){
    return this._id.toHexString();

});
orderSchema.set('toJSON',{
    virtuals:true
})
module.exports=orderSchema