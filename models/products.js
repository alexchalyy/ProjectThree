module.exports = function(sequelize, DataTypes) {
  var Products = sequelize.define("Products", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER,
      alowNull: false
    }
  });
  return Products;

};
