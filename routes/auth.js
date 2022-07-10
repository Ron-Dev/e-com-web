const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const { PASSWORD_TOKEN }=require("../utils/config")
require('../utils/passport')(passport);
const {User, Role} = require('../models');

router.post('/signup',  (req, res)=> {
    const passwordRegex=/^[a-zA-Z0-9]+$/;
    if (!req.body.userName || !req.body.password || !req.body.roleName) {
       return res.status(400).send({
            msg: 'Please pass username, password and role.'
        })
    } 
    if (!req.body.password.match(passwordRegex)) {
        return res.status(400).send({
             msg: 'password should be alphanumeric.'
         })
     }
    Role.findOne({
            where: {
                role_name: req.body.roleName
            }
        }).then((role) => {
            console.log(role.id);
            User
            .create({
                username: req.body.userName,
                password: req.body.password,
                role_id: role.id
            })
            .then((user) => res.status(201).send(user))
            .catch((error) => {
                res.status(400).send(error);
            });
        }).catch((error) => {
            res.status(400).send(error);
        });
});

router.post('/signin',  (req, res)=> {
    User.findOne({
            where: {
                username: req.body.userName
            }
        })
        .then((user) => {
            if (!user) {
                return res.status(401).send({
                    message: 'Authentication failed. User not found.',
                });
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    var token = jwt.sign(JSON.parse(JSON.stringify(user)), PASSWORD_TOKEN, {
                        expiresIn: 86400 * 30
                    });
                    jwt.verify(token, PASSWORD_TOKEN,  (err, data)=> {
                        console.log(err, data);
                    })
                    res.json({
                        success: true,
                        token: `JWT ${token}`
                    });
                } else {
                    res.status(401).send({
                        success: false,
                        msg: 'Authentication failed. Wrong password.'
                    });
                }
            })
        }).catch((error) => res.status(400).send(error.message));
});

module.exports = router;