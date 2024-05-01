let Product = require("../models/Product");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

exports.addProduct = async (req, res) => {
    try {
        req.body.productSizes = req.body.productSizes.split(",");
        req.body.productColors = req.body.productColors.split(",");
        let multipleNames = [];
        console.log(req.files);
        if (req.files) {
            if (req.files.productImages) {
                console.log(req.files);
                if (Array.isArray(req.files.productImages)) {
                    let files = req.files.productImages;
       
                    const promises = files.map((file) => {
                        const fileName = new Date().getTime().toString() + "-" +file.name;
                        const savePath = path.join(
                            __dirname,
                            "../public/assets/",
                            "productImages",
                            fileName
                        );
                        multipleNames.push(fileName);
                        return file.mv(savePath);
                    });
                    await Promise.all(promises);
                    req.body.productImages = multipleNames;
                } else if (!Array.isArray(req.files)) {
                    let file = req.files.productImages;
                    const fileName = new Date().getTime().toString() + "-" + file.name;
                    const savePath = path.join(
                        __dirname,
                        "../public/assets/",
                        "productImages",
                        fileName
                    );
                    await file.mv(savePath);
                    req.body.productImages = fileName;
                }
            }

        }

        let product = new Product(req.body);
        let result = await product.addProduct();
        console.log("Product added");
        res.status(200).json({ message: "Product added", productId: result._id, product: result });
    } catch (error) {
        console.log(error);
        console.log(req.body);
        res.status(500).json({ message: "Internal server error" })
    }
}


exports.getAllProducts = async (req, res) => {
 try {
    let product = new Product();
    let result = await product.getAllProducts();
    res.status(200).json( result );
 } catch (error) {
    res.status(500).json({ message: "Internal server error" })
 }   
}

exports.getSingleProductById = async (req, res) => {
    try {
        let product = new Product();
        let result = await product.getSingleProductById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.getProductsInPriceRange = async ( req,res)=>{
    try {
        let product = new Product();
        let result = await product.getProductsInPriceRange(req.params.startPrice,req.params.endPrice);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.getProductsByCategory = async (req,res)=>{
    try {
        let product = new Product();
        let result = await product.getProductsByCategory(req.params.category);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}