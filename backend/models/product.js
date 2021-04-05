module.exports = (sequelize, DataTypes) => {
  return sequelize.define("product",
    {
      name: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      quantity: DataTypes.INTEGER,
      description: DataTypes.STRING,
      coments: DataTypes.STRING,
      rating: DataTypes.INTEGER,
    },
    {
      underscored: true,
    }
  );
};