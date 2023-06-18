const express =require("express")
const router =express.Router()
const mongoose= require("mongoose");
const productSchema = require("../models/Product");




 const Product= new mongoose.model("Product",productSchema);

//create product into db:-
router.post("/",async(req,res)=>{
    const product = new  Product({
       name:req.body.name,
       price:req.body.price
    })
       console.log(product)
       const result=await  product.save()
     
     res.send(result)
   
   });
   

//get data from db :-
router.get("/",async(req,res)=>{
    const product = await Product.find()
       console.log(product)
    res.send(product)
     
});

//search from db by key:-
router.get("/:key",async(req,res)=>{
    const product = await Product.find(
        {name:req.params.key}
    )
   
       console.log(product)
    res.send(product)
     
});
//update data into db :
router.put("/:id",async(req,res)=>{
    const product = await Product.findByIdAndUpdate({_id:req.params.id},
        {
        $set:{ name:"blackberry"

        }},
    {
        useFindAndModidy:false
    }
        
    )
    
    
       console.log(product)
    res.send(product)
     
});

//deldete data from db :-
router.delete("/:id",async(req,res)=>{
    const product = await Product.deleteOne({_id:req.params.id},
       
   
        
    )
    
    
       console.log(product)
    res.send(product)
     
});

module.exports=router;
