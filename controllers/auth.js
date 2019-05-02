const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.postlogin = (req, res, next) => {
    const {
        Username,
        Password
    } = req.body;
    if (!Username || !Password) {
        res.status(400).json({
            msg: "All Fields are required"
        })
    } else {
        User.findOne({
            where: {
                Username
            }
        }).then(user => {
            if (!user) {
                res.status(400).json({
                    msg: "Invalid Username"
                })
            }
            bcrypt.compare(Password, user.Password)
                .then(match => {
                    if (!match) {
                        return res.status(400).json({
                            msg: "Invalid Password"
                        })
                    }
                    jwt.sign({
                            id: user.id
                        },
                        process.env.AUTH_SECRET_KEY,
                        // {
                        //     expiresIn: "1h"
                        // },
                        (err, token) => {
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    Username: user.Username,
                                    Password: user.Password
                                }
                            })
                        });
                })
                .catch(err => {
                    next(err)
                })
        }).catch(err => next(err))
    }
}