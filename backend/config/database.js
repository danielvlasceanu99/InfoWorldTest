const Sequelize = require("sequelize");

const username = "root";
const password = "";

const sequelize = new Sequelize("TestDB", username, password, {
	dialect: "mysql",
	host: "localhost",
	define: {
		timestamps: true,
	},
});

module.exports = sequelize;
