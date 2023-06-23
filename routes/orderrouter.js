const express =require("express")
const router =express.Router()
const mongoose= require("mongoose");
const orderSchema = require("../models/Orders");
const checklogin = require("../helpers/authjwt");
const OrderItemSchema = require("../models/Order-Item");




 const Order= new mongoose.model("Order",orderSchema);
const OrderItem= new mongoose.model("OrderItem",OrderItemSchema)
//create order into db:-

router.post("/",async(req,res)=>{







let orderItemsIds=Promise.all( req.body.orderItems.map(async orderItem=>{

    let newOrderItem=new OrderItem({
        quantity:orderItem.quantity,
        product:orderItem.product
    });
    newOrderItem=await newOrderItem.save()
    return newOrderItem._id
}))
  

let orderItemsIdsResolved=await orderItemsIds
const totalPrices= await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
    const orderItem=await OrderItem.findById(orderItemId).populate("product","price")

    const totalPrice=orderItem.product.price * orderItem.quantity
    return totalPrice
}))

 let totalPrice=totalPrices.reduce((a,b)=> a+b ,0)
 console.log(totalPrice)
    const order = new  Order({
        orderItems:orderItemsIdsResolved,
       shipping:req.body.shipping,
       city:req.body.city,
       country:req.body.country,
       phone:req.body.phone,
       user:req.body.user,
       totalPrice:totalPrice
      

    })
      
      const result=await  order.save()
     if(!order)
     return res.status(400).send('the order is not be created');
    //  console.log(order)




     res.send(order)
   
   });
   

//get data from db :-

router.get("/",async(req,res)=>{
    const orderList = await Order.find().populate("user","name").sort({"createdAt":-1})
      
       console.log( orderList)
    res.send( orderList)
     
});
//search from db by key:-
router.get("/:id", async(req,res)=>{
    const order = await Order.findById(req.params.id)
    .populate("user","name")
    .populate({path:"orderItems",populate:"product"})
    
    res.send(order)
     
});
//getting totalseles:-
router.get("/get/totalsales",async(req,res)=>{
    try{

  
    const totalSales= await Order.aggregate([
        {$group :{ _id:0,totalsales: {$sum :'$totalPrice'}}}
    ])

    if(!totalSales){
        return res.status(400).send("total sales is not be genarated")
    }
    console.log(totalSales)

    res.send( {totalsales:totalSales.pop().totalsales})
}
catch(err){
    console.log(err)}
});
//how many ordere id count:-
//  router.get("/get/count",async(req,res)=>{
   
//     const orderCount=await Order.countDocuments({ limit: 10 })
//     console.log(orderCount)
//     if(!orderCount){
//         return res.status(500).json({ success:false})
//     }
//     res.status(200).send(orderCount)

//  });
// geting the orders by specific users:-
router.get("/get/userorders/:userid", async(req,res)=>{
    const userOrders = await Order.findById(req.params.userid).populate({path:"orderItems",populate:"product"})
    .sort({"createdAt":-1})
    
    res.send(userOrders )
     
});

//update data into db :
router.put("/:id",async(req,res)=>{
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status:req.body.status
      

        },
        {new:true}

    
        
    )
    
    
     console.log(order)
    res.send(order)
     
});

//delate data from db :-
router.delete("/:id",async(req,res)=>{
    const order = await Order.findByIdAndRemove(req.params.id,
       
    ).then(async order=>{
        if(order){
            await order.orderItems.map( async orderItem=>{
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.send("deleted order")
        }



       
    })
    




       console.log(order)
    res.send(order)
     
});

module.exports=router;

/*
 {
    orderItems:[
        {
            "quantity":2,
            "product":"648dfa856d83d099a06656a5"
        },
        {
            "quantity":3,
            "product":"648ecefd88e17ac788efca56"
        },
    ],
"shipping":"maijdeePowrobvazar",
"city":"noakhlai",
"country":"bangladesh",
"phone":"982795729475972",
"user":"648f3276e3a164d46615b251"

 }
 */