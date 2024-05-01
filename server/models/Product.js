const productsCollection = require('../db').db().collection("products");
const ObjectID = require("mongodb").ObjectID;
let Product = function (data) {
    this.data = data;
    this.errors = [];
};

Product.prototype.cleanUp = function () {
    this.data = {
        productTitle: this.data.productTitle,
        productDescription: this.data.productDescription,
        stockAvailable: Number(this.data.stockAvailable), // in number
        productPrice: Number(this.data.productPrice), // in number
        productImages: this.data.productImages, // array of images
        category: this.data.category, // SHIRTS, JEANS, CASUALS, SPORTS
        subCategory: this.data.subCategory, // FORMALS, PARTYWEAR, DAILYWEAR
        productColors: this.data.productColors, // ['RED','GREEN','BLUE','BLACK','WHITE','YELLOW']
        gender: this.data.gender, // ['MALE', 'FEMALE', 'UNISEX']
        productType: this.data.productType, // CLOTH, SHOES, WATCH, GLASSES
        productSizes: this.data.productSizes, // ['XS','S','M','L','XL','XXL'] OR [9,10,11,12,13,14,15]
        createdDate: new Date(),
    };
};

Product.prototype.addProduct = async function () {
    try {
        this.cleanUp();
        let data = await productsCollection.insertOne(this.data);
        let product = await productsCollection.findOne({ _id: data.insertedId });
        console.log("here");
        return product;
    } catch (error) {
        console.log(error);
        return error;
    }
}


Product.prototype.getAllProducts = async function () {
    try {
        let products = await productsCollection.find({}).toArray();
        return products;
    } catch (error) {
        console.log(error);
        return error
    }
}

Product.prototype.getSingleProductById = async function (id) {
    try {
        let product = await productsCollection.findOne({_id: new ObjectID(id)});
        return product;
    } catch (error) {
        console.log(error);
        return error

    }
}

Product.prototype.getProductsInPriceRange = async function(startPrice, endPrice){
    try {
        console.log(startPrice, endPrice);
        let products = await productsCollection.find({productPrice:{$gte: parseInt(startPrice), $lte: parseInt(endPrice)}}).toArray();
        console.log(products);
        return products;
    } catch (error) {
        console.log(error)
        return error;
    }
}

Product.prototype.getProductsByCategory = async function(category){
    try {
        let products = await productsCollection.find({category:category}).toArray();
        return products;
    } catch (error) {
        console.log(error);
        return error
    }
}

module.exports = Product;