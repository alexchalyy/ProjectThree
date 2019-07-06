 


module.exports = function(sequelize, DataTypes) {

  /*
  var User = sequelize.define("Users", {
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    isLoggedIn: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    creditCardNumber: DataTypes.STRING,
    expDate: DataTypes.STRING,
    cvv: DataTypes.INTEGER,
    swag1name: { type: DataTypes.STRING, defaultValue: "Swag 1"},
    swag1quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    swag2name: { type: DataTypes.STRING, defaultValue: "Swag 2"},
    swag2quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    swag3name: { type: DataTypes.STRING, defaultValue: "Swag 3"},
    swag3quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    swag4name: { type: DataTypes.STRING, defaultValue: "Swag 4"},
    swag4quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    swag5name: { type: DataTypes.STRING, defaultValue: "Swag 5"},
    swag5quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    swag6name: { type: DataTypes.STRING, defaultValue: "Swag 6"},
    swag6quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    swag7name: { type: DataTypes.STRING, defaultValue: "Swag 7"},
    swag7quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    swag8name: { type: DataTypes.STRING, defaultValue: "Swag 8"},
    swag8quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    swag9name: { type: DataTypes.STRING, defaultValue: "Swag 9"},
    swag9quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    swag10name: { type: DataTypes.STRING, defaultValue: "Swag 10"},
    swag10quantity: { type: DataTypes.INTEGER, defaultValue: 0 }
  })
  */

  // User.beforeCreate((user, options) => {
  //   const salt = bcrypt.genSaltSync();
  //   user.password = bcrypt.hashSync(user.password, salt);
  //   // user.confirm_password = bcrypt.hashSync(user.confirm_password, salt);
  // });

var User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len:[5,25]
    }
  }
});

User.associate = function(models) {
  User.hasMany(models.Order, {
    onDelete: 'cascade'
  })
}
 
  return User;
};
