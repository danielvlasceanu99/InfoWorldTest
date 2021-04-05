const express = require("express");
const router = express.Router();
const resetRouter = require("./reset");
const productRouter = require("./product");

router.use("/", resetRouter);
router.use("/", productRouter);
module.exports = router;
