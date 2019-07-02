// const express = require('express')
// // const router = express.Router()
// const User = require('../database/models/user')
const passport = require('../passport')

const userRouter = require("express").Router();
const { check, validationResult } = require('express-validator');
var bcrypt = require('bcrypt');
// const { check, validationResult } = require('express-validator/check');
const db = require('../models');

userRouter.post("/api/users", (req, res) => {

    db.Users.create(req.body).then(function (DBUsers) {
        res.json(dbUsers);
    })
    // res.send(req.body);
});

userRouter.get("/api/loggedin", function (req, res) {
    console.log("this function returns all data of logged in user.");
    db.Users.findOne({
        where: {
            isLoggedIn: 1
        }
    }).then(function (dbUsers) {
        console.log("logged in user present");
        res.json(dbUsers);
    }).catch(err => {
        console.log("weird error");
        res.status(400).json({error: err});
    });
});

/*userRouter.put("/api/usersbuy/:id", function (req, res) {
    console.log("purchase")
});*/

userRouter.put("/api/buy", function(req, res)    {
    // buy route created!
    console.log("buy route called");
    db.Users.update({
        swag1quantity: req.body.swag1quantity,
        swag2quantity: req.body.swag2quantity,
        swag3quantity: req.body.swag3quantity,
        swag4quantity: req.body.swag4quantity,
        swag5quantity: req.body.swag5quantity,
        swag6quantity: req.body.swag6quantity,
        swag7quantity: req.body.swag7quantity,
        swag8quantity: req.body.swag8quantity,
        swag9quantity: req.body.swag9quantity,
        swag10quantity: req.body.swag10quantity
    },
    {
        where:  {
            email: req.body.email
        }
    }).then(function (dbUsers)  {
        res.json(dbUsers);
        console.log("item purchased");
    }).catch(err => {
        console.log("weird error");
        res.status(400).json({error: err});
    });    
});

userRouter.put("/api/login/:id", function (req, res) {
    console.log("log in function is called.");
    db.Users.update({
        isLoggedIn: 1
    },
        {
            where: {
                id: req.params.id
            }
        }).then(function (dbUsers) {
            res.json(dbUsers);
            console.log("user updated");
        }).catch(err => {
            console.log("weird error");
            res.status(400).json({error: err});
        });
});

userRouter.put("/api/logout/:id", function (req, res) {
    console.log("log out function is called.");
    db.Users.update({
        isLoggedIn: 0
    },
        {
            where: {
                id: req.params.id
            }
        }).then(function (dbUsers) {
            res.json(dbUsers);
            console.log("user updated");
        }).catch(err => {
            console.log("weird error");
            res.status(400).json({error: err});
        });
});

userRouter.post("/api/loggeduser", (req, res) => {
    console.log("Looking for logged in users...");
    db.Users.findOne({
        where: {
            isLoggedIn: 1
        }
    }).then(user => {
        if (user) {
            console.log("a user is logged in!");
            res.json(dbUsers);
        } else {
            console.log("there are no logged in users");
        }
    }).catch(err => {
        console.log("weird err=" + err);
        res.status(400).json({ error: err })
    })
})

userRouter.post("/login", (req, res) => {
    console.log("post to login, email = " + req.body.email);
    db.Users.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            console.log("login then");
            if (user) {
                console.log("then user exists, start bcrypt compareSync");
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    console.log("compareSync success");
                    res.send({ message: true, user })
                    console.log(user);
                } else {
                    console.log("compareSync failed");
                    alert("Something went wrong please try again");
                }
            } else {
                console.log("else no user");
                res.status(400).json({ error: "User does not exist" })
            }
        })
        .catch(err => {
            console.log("login catch err=" + err);
            res.status(400).json({ error: err })
        })
})

userRouter.get("/api/allusers", function (req, res) {
    db.Users.findAll({}).then(function (dbUsers) {
        res.json(dbUsers);
    });
});

userRouter.get("/api/users:id", function (req, res) {
    db.Users.findOne({}).then(function (dbUsers) {
        res.json(dbUsers);
    });
});

userRouter.post("/register", (req, res) => {
    const now = new Date()
    const userData = {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        isLoggedIn: 1,
        created_at: now
    }
    db.Users.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    db.Users.create(userData)
                        .then(user => {
                            res.json({ status: user.email + " registered" })
                        })
                        .catch(err => {
                            res.send("error: " + err)
                        })
                })
            } else {
                res.json({ error: "User already exists" })
            }
        })
        .catch(err => {
            res.send("error: " + err)
        })

})
userRouter.put("/login", (req, res) => {

    db.Users.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(userDb => {
            console.log(userDb.dataValues.email);
            let user = userDb.dataValues;
            //db.Users.update(userData)
            db.Users.update({ isLoggedIn: 1 }, { where: { email: user.email } })
                .then(user => {
                    res.json({ status: "User's isLoggedIn has changed" })
                })

        })
        .catch(err => {
            res.send("error: " + err)
        })

})



//             })
//             newUser.save((err, savedUser) => {
//                 if (err) return res.json(err)
//                 res.json(savedUser)
//             })
//         }
//     })
// })
/*
userRouter.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)

userRouter.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

userRouter.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})



    db.Users.create(req.body).then(function (dbUsers) {
        res.json(dbUsers);
    });
 //res.send(req.body);
//});

userRouter.get("/api/allusers", function (req, res) {
    db.Users.findAll({}).then(function (dbUsers) {
        res.json(dbUsers);
    });
});
*/
 
module.exports = userRouter;
