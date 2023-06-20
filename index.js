const express=require("express")
const dotenv =require("dotenv")
const cors=require('cors')

const mongoose = require('mongoose');
const port= 5000
const app=express()

// const checkLogin =require("./middlewares/checklogin")
// const { MongoClient, ServerApiVersion} = require('mongodb');




// const bcrypt =require("bcrypt")

// const jwt =require("jsonwebtoken")


// const userSchema=require("./schemas/userSchema")

// const User= new mongoose.model("User",userSchema)
 //mohammadibrahim6454
        //ibWUdfbgoLQFHvtG
 app.use(cors())
dotenv.config()
app.use(express.json())




// const client = new MongoClient(uri, { useNewUrlParser: true,
//      useUnifiedTopology: true, 
//      serverApi: ServerApiVersion.v1 });


const productRouter=require("./routes/productrouter")
const orderRouter=require("./routes/orderrouter")
const userRouter=require("./routes/userrouter")


//connection withe db:-
const uri = process.env.CONNECT_DB
mongoose.set("strictQuery", true);
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
  .then(() => console.log('connection sucessful'))
  .catch((err)=>console.log(err));

//connection withe db:---------------

async function run(){
    
        try{ 
// start ecommarce:
app.use("/product",productRouter)
app.use("/order",orderRouter)
app.use("/user",userRouter)
 

 

//send sode of ecommarce:-
 
        
      }
      finally{

      }
    

  

}
run().catch(console.dir)




const errorHandler =(err,req,res,next)=>{
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({
        error:err
    })
}

app.use(errorHandler)



app.listen(port,()=>{
    console.log(port,"port")

})
