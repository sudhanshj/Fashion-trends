const mongoose = require("mongoose");
const ProductCollection = require('../../models/ProductSchema');
const getproductcontroller = async (req, res) => {
    try {
        const { id,category, name, sub_category } = req.params;
        let product;
        if (category) {
            const searchCategory = category.toLowerCase();
            product = await ProductCollection.find({
                category: { $regex: new RegExp(searchCategory, "i") },
            });
        }
        else if (name) {
            const searchname = name.toLowerCase();
            product = await ProductCollection.find({
                name: { $regex: new RegExp(searchname, "i") }
            });
        }
        else if (sub_category) {
            const searchsub_category = sub_category.toLowerCase();
            product = await ProductCollection.find({
                sub_category: { $regex: new RegExp(searchsub_category, "i") },
            });
        }
        else if (id) {
            product = await ProductCollection.find({
                _id:id,
            });
        }
        else if (req.path.includes("/random")) {
            product = await ProductCollection.aggregate([
                {
                $sample: {
                    size:9,
                },
            },
            ]);
        }
        else if (req.path.includes("/top-rated")) {
            product = await ProductCollection.find().sort({rating:-1}).limit(9);
        }
        else if (req.path.includes("/lowtohigh")) {
            product = await ProductCollection.find().sort({new_price:-1}).limit(9);
        }
        else if (req.path.includes("/hightolow")) {
            product = await ProductCollection.find().sort({new_price : -1}).limit(9);
        }
        else {
             product = await ProductCollection.find();
            console.log("Products fetched successfully");
        }
        if (!product || product.length === 0)
            return res.status(200).send({ message: "Product not found" });
        return res.status(200).send(product);
    }
    catch (error) {
        res.status(504).send({
            message: "Error in fetching products"
        });
        console.log(`Error occured :${error}`);
    }

}
// const getproductcontroller = (req,res)=>{
//     res.send("get product controller")
// };
module.exports = getproductcontroller;