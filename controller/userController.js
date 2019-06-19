const db = require("../models");

module.exports = {
    findAll: function (req, res) {
        db.User.findAll({
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    },
    findOne: function (req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            },
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    },
     // app.post('/user', [
  //   // username must be an email
  //   check('username').isEmail(),
  //   // password must be at least 5 chars long
  //   check('password').isLength({ min: 5 })
  // ], (req, res) => {
  //   // Finds the validation errors in this request and wraps them in an object with handy functions
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(422).json({ errors: errors.array() });
  //   }
  
  //   User.create({
  //     username: req.body.username,
  //     password: req.body.password
  //   }).then(user => res.json(user));
  // })0

    delete: function (req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    },
    create: function (req, res) {
        console.log(req.body)
        db.User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
        });
    }
};