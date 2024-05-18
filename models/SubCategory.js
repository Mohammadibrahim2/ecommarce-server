const mongoose=require("mongoose")

const subcategorySchema=mongoose.Schema({
   name:{
        type:String,
        required:true,
        unique:true
    },
   slug:{
    type:String,
    lowercase:true
   },
   category:{
      type:mongoose.ObjectId,
      ref:"Category",
      required:true
  },
})

subcategorySchema.virtual('id').get(function (){
   return this._id.toHexString();

});
subcategorySchema.set('toJSON',{
   virtuals:true
})


module.exports=subcategorySchema;