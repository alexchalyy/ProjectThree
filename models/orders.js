module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {

    productID: {
      type: DataTypes.INTEGER
    }
  });

  Order.associate = function(models) {
    Order.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  }
  return Order;
}