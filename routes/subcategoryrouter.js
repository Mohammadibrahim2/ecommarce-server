const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const subcategorySchema= require('../models/SubCategory')
const checklogin = require("../helpers/authjwt");
const { default: slugify } = require("slugify");




const SubCategory = new mongoose.model("SubCategory", subcategorySchema);

router.post("/",async(req,res)=>{
    
    const subsategory = new SubCategory({
      
     name:req.body.name,
     slug:slugify(req.body.name)
       

    })

    const result = await subsategory.save()
    res.send(result)



})


router.get("/",async(req,res)=>{
    
    const subcategory =await SubCategory.find().populate("category")

   
    res.send(subcategory)
   



})

router.get("/:id",async(req,res)=>{
   console.log(req.params.id)
  
    
    const subcategory =await SubCategory.find({
        category:req.params.id
        })
        console.log(subcategory)
        res.send({subcategory:subcategory})
  

})

router.put("/:id", async (req, res) => {
  
    const product = await SubCategory.findByIdAndUpdate({ _id: req.params.id },
        {category: req.body.category},
        {useFindAndModidy: false}

    )


    res.send(product)

});

module.exports=router;