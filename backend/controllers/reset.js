const connection = require("../models").connection;
const ProductDB = require("../models").Products;
const controller = {
	reset: (req, res) => {
		connection
			.sync({ force: true })
			.then(() => {
				for (let i = 1; i <= 10; i++) {
					const product = {
						name: `Product${i}`,
						price: i * 10,
						quantity: i * 100,
						description: `Product${i} description`,
						comments: `Product${i} comments`,
						rating: ((i - 1) % 5) + 1,
					};
					ProductDB.create(product).catch(() => {
						res.status(500).send({ message: "Server error" });
					});
				}
				res.status(200).send({ message: "'Database reseted" });
			})
			.catch(() => {
				res.status(500).send({ message: "Server error" });
			});
	},
};

module.exports = controller;
