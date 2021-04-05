const express = require("express");
const router = express.Router();
const productController = require("../controllers").product;

router.post("/addProduct", productController.addProduct);
router.get("/getProducts", productController.getProducts);
router.get("/getProduct/:id", productController.getProduct);
router.put("/updateProduct/:id", productController.updateProduct);
router.delete("/deleteProduct/:id", productController.delteProduct);

module.exports = router;
