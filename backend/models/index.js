const Sequelize = require("sequelize");
const db = require("../config/database");

const ProductModel = require("./product");

const Products = ProductModel(db, Sequelize);

module.exports = {
    connection: db,
    Products,
}