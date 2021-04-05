const express = require("express");
const { Op } = require("sequelize");
const ProductDB = require("../models").Products;

const controller = {
	addProduct: async (req, res) => {
		const product = {
			name: req.body.name,
			price: req.body.price,
			quantity: req.body.quantity,
			description: req.body.description,
			comments: req.body.comments,
			rating: req.body.rating,
		};

		const errors = {};

		if (!product.name) {
			errors.productName = "Insert product name";
			console.log("No product name");
		} else if (!product.name.match("^.{2,50}$")) {
			errors.productName = "Product name length must be between 2 and 50 characters";
			console.log("Product name does not match");
		}

		if (!product.price) {
			errors.price = "Insert valid product price";
			console.log("Invalid/No product price");
		}

		if (!product.quantity) {
			errors.price = "Insert product quantity";
			console.log("No product quantity");
		}

		if (Object.keys(errors).length === 0) {
			await ProductDB.create(product)
				.then(() => {
					res.status(201).send({ message: "Product created" });
				})
				.catch(() => {
					res.status(500).send({ message: "Server error" });
				});
		} else {
			res.status(400).send(errors);
		}
	},

	getProducts: async (req, res) => {
		const params = {
			order: "ASC",
			name: "%%",
		};
		if (req.query.order) {
			params.order = req.query.order.toUpperCase();
		}
		if (req.query.name) {
			params.name = "%" + req.query.name + "%";
		}
		console.log(params.name);
		try {
			const products = await ProductDB.findAll({
				where: {
					name: {
						[Op.like]: params.name,
					},
				},
				order: [["price", params.order]],
			});
			res.status(201).send(products);
		} catch {
			res.status(500).send({ message: "Server error" });
		}
	},

	getProduct: async (req, res) => {
		try {
			const product = await ProductDB.findByPk(req.params.id);
			if (product) {
				res.status(201).send(product);
			} else {
				res.status(404).send({ message: "Product not found" });
			}
		} catch (e) {
			console.log(e);
			res.status(500).send({ message: "Server error" });
		}
	},

	updateProduct: async (req, res) => {
		const product = await ProductDB.findByPk(req.params.id);
		if (product) {
			const errors = {};

			if (!product.name) {
				errors.productName = "Insert product name";
				console.log("No product name");
			} else if (!product.name.match("^.{2,50}$")) {
				errors.productName = "Product name length must be between 2 and 50 characters";
				console.log("Product name does not match");
			}

			if (!product.price) {
				errors.price = "Insert product price";
				console.log("No product price");
			} else if (product.price === 0) {
				errors.price = "Price can't be zero";
				console.log("Invalid price");
			}

			if (!product.quantity) {
				errors.price = "Insert product quantity";
				console.log("No product quantity");
			}

			if (Object.keys(errors).length === 0) {
				await product
					.update({
						name: req.body.name,
						price: req.body.price,
						quantity: req.body.quantity,
						description: req.body.description,
						comments: req.body.comments,
						rating: req.body.rating,
					})
					.then(() => {
						res.status(201).send({ message: "Product updated" });
					})
					.catch(() => {
						res.status(500).send({ message: "Server error" });
					});
			} else {
				res.status(400).send(errors);
			}
		} else {
			res.status(404).send({ message: "Product not found" });
		}
	},

	delteProduct: async (req, res) => {
		await ProductDB.findByPk(req.params.id)
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
