const express = require("express");
const ProductDB = require("../models").Products;

const controller = {
	addProduct: async (req, res) => {
		const product = {
			name: req.body.name,
			price: req.body.price,
			quantity: req.body.quantity,
			description: req.body.description,
			coments: req.body.coments,
			rating: req.body.rating,
		};

		const errors = {};

		if (!product.name) {
			errors.productName = "No product name";
			console.log("Insert product name");
		} else if (!product.name.match("^.{2,50}$")) {
			errors.productName = "Product name does not match";
			console.log("Product name length must be between 2 and 50 characters");
		}

		if (!product.price) {
			errors.price = "No product price";
			console.log("Insert product price");
		}

		if (!product.quantity) {
			errors.price = "No product quantity";
			console.log("Insert product quantity");
		}

		if (Object.keys(errors).length === 0) {
			await ProductDB.crate(product)
				.then(() => {
					res.status(201).send({ message: "Product created" });
				})
				.catch(() => {
					res.status(500).send({ message: "Server error" });
				});
		}
	},

	getProducts: async (req, res) => {
		const params = {
			order: req.query.order,
			name: "%%",
		};
		if (req.query.name) {
			params.name = "%" + req.query.name + "%";
		}

		try {
			const products = await ProductDB.findAll({
				where: {
					[Op.like]: params.name,
				},
				order: [["name", params.order]],
			});
			res.status(201).send(products);
		} catch {
			res.status(500).send({ message: "Server error" });
		}
	},

	getProduct: async (req, res) => {
		try {
			const product = await ProductDB.findbyPk(req.params.id);
			if (product) {
				res.status(201).send(product);
			} else {
				res.status(404).send({ message: "Product not found" });
			}
		} catch {
			res.status(500).send({ message: "Server error" });
		}
	},

	updateProduct: async (req, res) => {
		const product = await ProductDB.findbyPk(req.params.id);
		if (product) {
			await prod
				.update({
					name: req.body.name,
					price: req.body.price,
					quantity: req.body.quantity,
					description: req.body.description,
					coments: req.body.coments,
					rating: req.body.rating,
				})
				.then(() => {
					res.status(201).send({ message: "Product updated" });
				})
				.catch(() => {
					res.status(500).send({ message: "Server error" });
				});
		} else {
			res.status(404).send({ message: "Product not found" });
		}
	},

	deelteProduct: async (req, rez) => {
		await ProductDB.findbyPk(req.params.id)
			.then(async (product) => {
				if (product) {
					await product.destroy();
					res.status(201).send({ message: "Product deleted" });
				} else {
					res.status(404).send({ message: "Product not found" });
				}
			})
			.catch(() => {
				res.status(500).send({ message: "Server error" });
			});
	},
};

module.exports = controller;
