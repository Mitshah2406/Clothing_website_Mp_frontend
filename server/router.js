const router = require("express").Router();
const userController = require("./controllers/userController");
const productController = require("./controllers/productController");
const authMiddleware = require("./middlewares/authToken");
router.get("/", async (req, res) => {
    res.send("Hello Intial Setup!!")
})
//AUTHENTICATION
router.post("/auth/signUp",userController.signUp)
router.post("/auth/signIn",userController.signIn)

//PRODUCT

router.post("/product/addProduct",productController.addProduct)

router.get("/product/getAllProducts",productController.getAllProducts)
router.get("/product/getSingleProductById/:id",authMiddleware.verifyToken,productController.getSingleProductById)
router.get("/product/getProductsInPriceRange/:startPrice/:endPrice",authMiddleware.verifyToken,productController.getProductsInPriceRange)
router.get("/product/getProductsByCategory/:category",authMiddleware.verifyToken,productController.getProductsByCategory)

module.exports = router;