const express =require("express")
const router =express.Router()
const mongoose= require("mongoose");
const userSchema = require("../models/User");
const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken');
const checklogin = require("../helpers/authjwt");


 const User= new mongoose.model("User",userSchema);

//create product into db:-
router.post("/register",async(req,res)=>{
    let user = new  User({
       firstName:req.body.fName,
       lastName:req.body.lName,
       email:req.body.email,
       phone:req.body.phone,
       passwordHash:bcrypt.hashSync(req.body.password,10),
       isAdmin:req.body.isAdmin
    })
    console.log(user)
       
       user=await  user.save()
       if(!user)
        return res.status(400).send("the user can not be created")
 
     let registedUser= user
     res.send(registedUser)
   
   });
   

//get data from db :-
router.get("/",  async(req,res)=>{
    const user = await User.find().select("-passwordHash").sort({createdAt:-1})
       
    res.send(user)
     
});

//search from db by key:-
router.get("/own",async(req,res)=>{

    // const user = await User.find(
    //     {email:req.body.email}
    // ).select('-passwordHash')
   
    //    console.log(user)
    // res.send(user)
     
});

//admin

router.get("/admin/:email",async(req,res)=>{
    const email=req.params.email
    const user= await User.findOne({email})
  
    isFinite(user.isadmin===true)
    res.send({"isAdmin":user.isAdmin})
})
//update data into db :
router.put("/:id",async(req,res)=>{

    const user = await User.findByIdAndUpdate({_id:req.params.id},
        {
        $set:{ name:req.body.name

        } },
    {
        useFindAndModidy:false
    }
        
    )
    
    
     
    res.send(user)
     
});

//deldete data from db :-
router.delete("/:id",async(req,res)=>{
 
    const user = await User.deleteOne({_id:req.params.id}
       
    )
    
    res.send({
        success:true,
        message:"successfully deleted user",
        user
        
    })
     
});
//for login user:-

router.post('/login',async(req,res)=>{
    console.log(req.body)
    const user= await User.findOne({email:req.body.email})
    const secret=process.env.SECRET
    if(!user){
        return res.status(400).send("the user is not found")
    }
    if(user && bcrypt.compareSync(req.body.password,user.passwordHash)){
        const token=jwt.sign(
            {
                userId:user.id,
                userEmail:user.email,
                isAdmin:user.isAdmin
                
            },
            secret,
            {expiresIn:'1h'}
        )
        return res.status(200).send({user:user,token:token})
    }
    else{
        res.status(400).send("user is not authenticated")
    }
   

})
module.exports=router;
