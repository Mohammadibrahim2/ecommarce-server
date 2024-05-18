const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const categorySchema= require('../models/Category')
const checklogin = require("../helpers/authjwt");
const { default: slugify } = require("slugify");




const Category = new mongoose.model("Category", categorySchema);

router.post("/",async(req,res)=>{
    
    const category = new Category({
      
     name:req.body.name,
     slug:slugify(req.body.name)
       

    })

    const result = await category.save()
    res.send(result)



})

router.get("/",async(req,res)=>{
    
    const category =await Category.find()

   
    res.send(category)



})
module.exports=router;