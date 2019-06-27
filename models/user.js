//  This creates a new table to store orders.
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Users", {
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    confirm_password: DataTypes.STRING,
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
    swag5quantity: { type: DataTypes.INTEGER, defaultValue: 0 }
  });


  // User.beforeCreate((user, options) => {
  //   const salt = bcrypt.genSaltSync();
  //   user.password = bcrypt.hashSync(user.password, salt);
   
  // });
// Define schema methods

// User.methods = {
//   checkPassword: function (inputPassword) {
//   return bcrypt.compareSync(inputPassword, this.password)
// },
//   hashPassword: plainTextPassword => {
//   return bcrypt.hashSync(plainTextPassword, 10)
//   }
// }
 //i beleive the above does both 
// User.prototype.validPassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

// User.pre('save', function (next) {
//   if (!this.password) {
//     console.log('models/user.js =======NO PASSWORD PROVIDED=======')
//     next()
//   } else {
//     console.log('models/user.js hashPassword in pre save');
//     this.password = this.hashPassword(this.password)
//     next()
//   }
// })
 



  return User;
};
