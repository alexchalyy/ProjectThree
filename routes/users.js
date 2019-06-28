const express = require("express")
// const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const userRouter = require("express").Router();
const db = require('../models');


userRouter.use(cors())
process.env.SECRET_KEY = "secret"

userRouter.post("/register", (req, res) => {
    const now = new Date()
    const userData = {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
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




userRouter.post("/enter", (req, res) => {
    // console.log(req.body);
    // res.send("works");
    db.Users.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {
                console.log("user data, line 64");
                console.log(user);
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    console.log("passwords match");
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
               }else{ 
                   res.send("compare didn't work");
               }
            } else {
                res.status(400).json({ error: "User does not exist" })
            }
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
})

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

// userRouter.get('/test', (req, res, next) => {
//     res.send("works");
// })


module.exports = userRouter;