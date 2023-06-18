const express =require("express")
const router =express.Router()
const mongoose= require("mongoose");
const orderSchema = require("../models/Product");




 const Order= new mongoose.model("Order",orderSchema);

//create order into db:-
router.post("/",async(req,res)=>{
    const order = new  Order({
       name:req.body.name,
       price:req.body.price,
       category:req.body.category,
     

    })
       console.log(order)
       const result=await  order.save()
     
     res.send(result)
   
   });
   

//get data from db :-
router.get("/",async(req,res)=>{
    const order = await Order.find()
       console.log(order)
    res.send(order)
     
});

//search from db by key:-
router.get("/:key",async(req,res)=>{
    const order = await Order.find(
        {name:req.params.key}
    )
   
       console.log(order)
    res.send(order)
     
});
//update data into db :
router.put("/:id",async(req,res)=>{
    const order = await Order.findByIdAndUpdate({_id:req.params.id},
        {
        $set:{ name:"blackberry"

        }},
    {
        useFindAndModidy:false
    }
        
    )
    
    
       console.log(order)
    res.send(order)
     
});

//deldete data from db :-
router.delete("/:id",async(req,res)=>{
    const order = await Order.deleteOne({_id:req.params.id},
       
    )
    
    
       console.log(order)
    res.send(order)
     
});

module.exports=router;