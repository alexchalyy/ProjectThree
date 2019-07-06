//  Those are API CRUD routes to post user inputs to db.
/*
var db = require("../models");

module.exports = function (app) {
    app.get("/api/allusers", function(req, res)    {
        db.User.findAll({}).then(function (dbUsers) {
            res.json(dbUsers);
          });
    });
}*/

var db = require("../models");


module.exports = function(app) {

//  GET ROUTES

app.get('/get/users', function(req, res) {
  console.log('loaded initial page');
  db.User.findAll({})
  .then(function(users) {
    console.log('loaded orders');
    res.json(users);
  })
})

app.get('/get/products', function(req, res) {
  console.log('loaded initial page');
  db.Product.findAll({})
  .then(function(users) {
    console.log('loaded orders');
    res.json(users);
  })
})

app.get('/get/orders', function(req, res) {
  console.log('loaded initial page');
  db.Order.findAll({})
  .then(function(users) {
    console.log('loaded orders');
    res.json(users);
  })
})

app.get('/get/userorders/', function(req, res) {
  db.User.findAll({
    include: [db.Order]
  }).then(function(orders) {
    res.json(orders)
  })
})

app.get('/get/userorders/:id', function(req, res) {
  db.User.findAll({
    where: {
      id: req.params.id,

    },
    include: [db.Order]
  }).then(function(orders) {
    res.json(orders)
  })
})

// POST ROUTES

app.post('/create/users', function(req, res) {
  console.log(req.body);
  db.User.create({
    username: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  })
  .then(function(user) {
    res.json(user);
  })
})

app.post('/create/products', function(req, res) {
  console.log(req.body);
  db.Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  })
  .then(function(user) {
    res.json(user);
  })
})

app.post('/create/orders', function(req, res) {
  console.log(req.body);
  db.Order.create({
    orderID: req.body.orderID,
    userID: req.body.userID,
    productID: req.body.productID
  })
  .then(function(user) {
    res.json(user);
  })
})

//  PUT ROUTES


};