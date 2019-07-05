//  In this project, a website is created where user can create an account, log in, and purchase Game of Thrones souvenirs.
//
//  Written by Alex Chalyy, Igor Guba, Chris Lee Paul, David Lawrence, and Keith Hemsoth.
const bodyParser = require('body-parser');
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
var db = require("./models");
const User = require('./models/user');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./passport');
 
 
 
// var app = express();
// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());


console.log("beginning of server");

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Sessions might be needed but not sure of the rest

app.use(session({
  key: "user_sid",
  secret: "puffanstuff",
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));

//not sure if this code is needed, chris pick a direction and go there
// app.use( (req, res, next) => {
//   console.log('req.session', req.session);
//   return next();
// });

// app.post('/user', (req, res) => {
//   console.log('user signup');
//   req.session.username = req.body.username;
//   res.end()
// })
 

// Define Routes

// app.use('/user', user) are these the same, sure looks like they are

app.use('/', require('./routes/users'));

// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/contacts', require('./routes/contacts'));

var syncOptions = { force: false };

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

console.log("works up till here");