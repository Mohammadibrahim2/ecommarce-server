
const mongoose = require('mongoose');
const isAdmin=async(req,res,next)=>{
    const {authorization}=req.headers
    try{
      const user= await User.findById(req.user._id)
      if(user.isAdmin!==true){
        return "unauthorize"
      }
      else{
        next();
      }

      
    }
    catch(err){
       res.status(404). next("Authentication failed")
    }
}
module.exports = isAdmin;