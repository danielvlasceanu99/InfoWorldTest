module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"product",
		{
			name: DataTypes.STRING,
			price: DataTypes.DOUBLE,
			quantity: DataTypes.INTEGER,
			description: DataTypes.STRING,
			comments: DataTypes.STRING,
			rating: DataTypes.INTEGER,
		},
		{
			underscored: true,
		}
	);
};
