module.exports = function(sequelize, DataTypes) {
  var Orders = sequelize.define('Orders', {
    userID: {
      type: DataTypes.INTEGER
    },
    productID: {
      type: DataTypes.INTEGER
    }
  });
  return Orders;
}