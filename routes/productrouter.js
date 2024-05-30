const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const productSchema = require("../models/Product");
const checklogin = require("../helpers/authjwt");

const categorySchema = require("../models/Category")


const Product = new mongoose.model("Product", productSchema);
const Category = new mongoose.model("Category", categorySchema)
//create product into db:-
router.post("/many", async (req, res) => {

    let items = req.body.map(item => {
        return {

            name: item.name,
            category: item.category,
            price: item.price,
            brand: item.brand,
            photo: item.photo,



        };


    })
    console.log(items)
    const product = new Product(items)

    const result = await product.insertMany(product, function (err, product) {
        if (err) {
            return console.error(err);
        } else {
            console.log("Multiple documents inserted to Collection");
        }
    })


    // res.send({acknowledged:true})


});
router.post("/", async(req, res) => {

    console.log("there usjhfkj hgkhfda")
console.log(req.body)
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        brand: req.body.brand,
        // photo: req.body.photo,
        // description: req.body.description

    })

     const result = await res.send({message:"there is a probem"})
    console.log(result)
    


});


//get data from db :-
router.get("/", async (req, res) => {
    const products = await Product.find()
    const countProducts=await Product.countDocuments({})
    
        res.send({products,countProducts})
  
});
//.populate("category", "name")

//search from db by key:-
router.get("/search/:keyword", async (req, res) => {
    let value = req.params.keyword

    console.log("value", value)

    let data = await Product.find({
        $or: [{ name: { $regex: value, $options: "i" } }]
    })
    console.log(data)
    res.send(data)




});
//filter
router.get("/product-category/:slug", async (req, res) => {
    try {
        const value = req.params.slug

        const category = await Category.findOne({ slug: value });

        const products = await Product.find({ category }).populate("category")

        res.send({ products, category })

    }

    catch (error) {
        console.log(error)
    }




})
// Get single product
router.get("/get-product/:id", async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findOne({ _id: id }).populate("category");
        res.status(200).send({
            message: "single producr feched",
            success: true,
            product
        })

    }

    catch (error) {
        console.log(error)
    }
})
//related products:
router.get("/related-products/:pid/:cid", async (req, res) => {
    try {
        const {pid,cid}=req.params
        console.log(pid,cid)
        const products = await Product.find(
          {  category:cid,
            _id:{ $ne:pid }
        }).populate("category")
        res.status(200).send({
            message: "related products feched",
            success: true,
            products
        })

    }

    catch (error) {
        
       console.log(error)
      
    }
})

//filtyering by price and category

router.post("/product-filter", async (req, res) => {
    try {

        const { checked, radio, subId } = req.body
       

        let args = {}

        if (checked.length > 0) args.category = checked
        if (subId.length > 1) args.subcategory = subId
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await Product.find(args).populate("category subcategory")
        res.status(200).send({
            success: true,
            products
        })
    }
    catch (error) {
        res.send({
            message: "filtering error"
        })
    }
})

//update data into db :
router.put("/:id", async (req, res) => {
    const product = await Product.findByIdAndUpdate({ _id: req.params.id },
        { subcategory: req.body.subcategory },
        { useFindAndModidy: false }

    )


    console.log(product)
    res.send(product)

});

//deldete data from db :-
router.delete("/:id", async (req, res) => {
    const product = await Product.deleteOne({ _id: req.params.id })
  
    res.send({
        success:true,
        message:"Successfully deleted Product",
        product
    })

});

module.exports = router;
