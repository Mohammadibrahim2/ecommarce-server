const mongoose = require('mongoose');

const productSchema= mongoose.Schema({
    name:{
        type:String,
        
    },
    price:{
        type:String,
    },
    description:{
        type:String
    },
    // photo:{
    //     type:String,
    //     default:''

    // },
    brand:{
        type:String
    },
    // category:{
    //     type:mongoose.ObjectId,
    //     ref:"Category",
    //     required:true
    // },
    // countInStock:{
    // type:Number
    // },
    // createdAt:{
    //     type: Date, 
    //     required: true, 
    //     default: Date.now
    // },
    // rating:{
    //     type:Number
    // },
    // subcategory:{
    //     type:mongoose.ObjectId,
    //     ref:"SubCategory",
    //     required:true
    // }

   
})

productSchema.virtual('id').get(function (){
    return this._id.toHexString();

});
productSchema.set('toJSON',{
    virtuals:true
})


module.exports=productSchema;