const express =require("express")
const router =express.Router()
const mongoose= require("mongoose");
const userSchema = require("../models/User");
const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken')


 const User= new mongoose.model("User",userSchema);

//create product into db:-
router.post("/",async(req,res)=>{
    let user = new  User({
       name:req.body.name,
       email:req.body.email,
       passwordHash:bcrypt.hashSync(req.body.password,10),
       isAdmin:req.body.isAdmin
    })
       
       user=await  user.save()
       if(!user)
        return res.status(400).send("the user can not be created")
       
     
     res.send(user)
   
   });
   

//get data from db :-
router.get("/",async(req,res)=>{
    const user = await User.find().select("-passwordHash")
       console.log(user)
    res.send(user)
     
});

//search from db by key:-
router.get("/:id",async(req,res)=>{
    const user = await User.find(
        {name:req.params.key}
    ).select('-passwordHash')
   
       console.log(user)
    res.send(user)
     
});
//update data into db :
router.put("/:id",async(req,res)=>{
    const user = await User.findByIdAndUpdate({_id:req.params.id},
        {
        $set:{ name:"blackberry"

        }},
    {
        useFindAndModidy:false
    }
        
    )
    
    
       console.log(user)
    res.send(user)
     
});

//deldete data from db :-
router.delete("/:id",async(req,res)=>{
    const user = await User.deleteOne({_id:req.params.id}
       
    )
    
    
    console.log(user)
    res.send(user)
     
});
//for login user:-

router.post('/login',async(req,res)=>{
    const user= await User.findOne({email:req.body.email})
    const secret=process.env.SECRET
    if(!user){
        return res.status(400).send("the user is not found")
    }
    if(user && bcrypt.compareSync(req.body.password,user.passwordHash)){
        const token=jwt.sign(
            {
                userId:user.id
            },
            secret,
            {expiresIn:'1m'}
        )
        return res.status(200).send({user:user.email,token:token})
    }
    else{
        res.status(400).send("user is not authenticated")
    }
   

})
module.exports=router;
